import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CURRENCIES, formatNumberAsCurrency, getCurrencyByCode, type Currency } from "@/lib/currency";
import { getRegionPricing, type RegionPricing } from "@/lib/pricing";
import { detectUserRegion, saveRegionPreference } from "@/lib/region";

const STORAGE_KEY = "sb_currency";
const CACHE_KEY = "sb_currency_rates_cache";
const CACHE_EXPIRY_MS = 1000 * 60 * 60; // 1 hour

type RatesMap = Record<string, number>;

interface CachedRates {
  rates: RatesMap;
  timestamp: number;
  apiSource: string;
}

type CurrencyContextValue = {
  currency: string;
  setCurrency: (code: string) => void;
  region: string;
  regionPricing: RegionPricing;
  detectedRegion: string;
  isIndianUser: boolean;
  convertPrice: (basePrice: number, fromCurrency?: string) => number;
  formatPrice: (basePrice: number, opts?: { maximumFractionDigits?: number; fromCurrency?: string }) => string;
  rates: RatesMap;
  isLoading: boolean;
  lastUpdated?: string;
  cacheStatus?: string;
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

// Emergency fallback rates (as safety net)
const EMERGENCY_RATES: RatesMap = {
  INR: 1,
  USD: 83.5,
  EUR: 90.2,
  GBP: 104.5,
  AED: 22.75,
  SGD: 62.0,
  AUD: 54.0,
  CAD: 61.5,
  JPY: 0.57,
  CNY: 11.5,
  CHF: 93.0,
  HKD: 10.75,
  NZD: 50.5,
  SEK: 7.9,
  NOK: 7.9,
  DKK: 12.1,
  ZAR: 4.6,
  THB: 2.37,
  MYR: 18.0,
  IDR: 0.0053,
  LKR: 0.31,
  BHD: 221.5,
  QAR: 22.9,
  OMR: 216.5,
  KWD: 271.0,
  SAR: 22.2,
  BRL: 17.0,
  MXN: 17.2,
  EGP: 3.2,
  PKR: 0.36,
  BDT: 0.79,
};

function getCachedRates(): CachedRates | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached) as CachedRates;
    const age = Date.now() - parsed.timestamp;
    if (age > CACHE_EXPIRY_MS) {
      console.log("[CACHE] Cache expired, fetching fresh rates");
      return null;
    }
    const ageSeconds = Math.round(age / 1000);
    console.log(`[CACHE] Using cached rates from ${parsed.apiSource} (${ageSeconds} sec old)`);
    return parsed;
  } catch {
    return null;
  }
}

function setCachedRates(rates: RatesMap, apiSource: string): void {
  try {
    const cache: CachedRates = {
      rates,
      timestamp: Date.now(),
      apiSource,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    console.log(`[CACHE] Saved fresh rates from ${apiSource}`);
  } catch {
    console.log("[CACHE] Failed to save rates to localStorage");
  }
}

async function fetchExchangeRates(baseCurrency: string, signal?: AbortSignal): Promise<{
  rates: RatesMap;
  date?: string;
  apiSource: string;
}> {
  // Check cache first
  const cached = getCachedRates();
  if (cached) {
    return { rates: cached.rates, apiSource: cached.apiSource };
  }

  // Primary API: exchangerate.host
  console.log(`[API] Attempting exchangerate.host for ${baseCurrency}...`);
  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`, { signal });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && Object.keys(data.rates).length > 0) {
        console.log(`[API] ✓ exchangerate.host succeeded for ${baseCurrency} (${Object.keys(data.rates).length} rates)`);
        const rates = data.rates as RatesMap;
        // Include base currency with rate 1
        rates[baseCurrency] = 1;
        setCachedRates(rates, "exchangerate.host");
        return { rates, date: data.date, apiSource: "exchangerate.host" };
      }
    }
  } catch (error) {
    console.log("[API] ✗ exchangerate.host failed:", error instanceof Error ? error.message : String(error));
  }

  // Fallback API: open.er-api.com
  console.log(`[API] Attempting open.er-api.com for ${baseCurrency}...`);
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`, { signal });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && Object.keys(data.rates).length > 0) {
        console.log(`[API] ✓ open.er-api.com succeeded for ${baseCurrency} (${Object.keys(data.rates).length} rates)`);
        const rates = data.rates as RatesMap;
        // Include base currency with rate 1
        rates[baseCurrency] = 1;
        setCachedRates(rates, "open.er-api.com");
        return { rates, apiSource: "open.er-api.com" };
      }
    }
  } catch (error) {
    console.log("[API] ✗ open.er-api.com failed:", error instanceof Error ? error.message : String(error));
  }

  // Final fallback: emergency rates
  console.log("[API] Both APIs failed, using emergency rates");
  const emergencyWithBase = { ...EMERGENCY_RATES };
  emergencyWithBase[baseCurrency] = 1;
  return { rates: emergencyWithBase, apiSource: "emergency-fallback" };
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || "";
    } catch {
      return "";
    }
  });

  const [detectedRegion, setDetectedRegion] = useState<string>("");
  const [isRegionLoaded, setIsRegionLoaded] = useState(false);

  // Detect region on mount
  useEffect(() => {
    detectUserRegion().then((detected) => {
      setDetectedRegion(detected);
      setIsRegionLoaded(true);

      // Set default currency to region's base currency if not already set
      if (!currency) {
        const regionPricing = getRegionPricing(detected);
        setCurrencyState(regionPricing.baseCurrency);
      }
    });
  }, []);

  const isIndianUser = detectedRegion === "IN";
  const regionPricing = useMemo(() => getRegionPricing(detectedRegion), [detectedRegion]);

  // Always use INR as base currency for exchange rate fetching
  const { data, isLoading } = useQuery({
    queryKey: ["fx-rates", "INR"],
    queryFn: ({ signal }) => fetchExchangeRates("INR", signal),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 5, // refresh every 5 minutes
    refetchOnWindowFocus: false,
    enabled: isRegionLoaded, // Only fetch after region is detected
  });

  const rates: RatesMap = useMemo(() => {
    const map: RatesMap = { INR: 1 };
    if (data?.rates) {
      for (const [code, rate] of Object.entries(data.rates)) {
        if (typeof rate === "number" && rate > 0) {
          map[code] = rate;
        }
      }
    }
    const ratesLog = Object.entries(map)
      .slice(0, 5)
      .map(([code, rate]) => `${code}=${rate}`)
      .join(" ");
    console.log(
      `[RATES MAP] Built from ${data?.apiSource || "unknown"} (base: INR) | ${ratesLog}${Object.keys(map).length > 5 ? " ..." : ""}`
    );
    return map;
  }, [data]);

  const setCurrency = useCallback((code: string) => {
    const exists = CURRENCIES.some((c) => c.code === code);
    if (exists) {
      setCurrencyState(code);
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {}
    }
  }, []);

  const convertPrice = useCallback(
    (basePrice: number, fromCurrency?: string) => {
      if (!Number.isFinite(basePrice)) return 0;

      // Apply 20% markup for non-Indian users
      const adjustedBasePrice = isIndianUser ? basePrice : basePrice * 1.2;

      // Always use INR as the source currency
      const sourceCurrency = fromCurrency || "INR";
      const sourceRate = rates[sourceCurrency] ?? 1;
      const targetRate = rates[currency] ?? 1;

      const converted = (adjustedBasePrice / sourceRate) * targetRate;
      console.log(
        `[CONVERSION] ${adjustedBasePrice} ${sourceCurrency} (rate: ${sourceRate}) → ${currency} (rate: ${targetRate}) = ${converted} [markup: ${isIndianUser ? "none" : "+20%"}]`
      );
      return converted;
    },
    [currency, rates, isIndianUser]
  );

  const formatPrice = useCallback(
    (basePrice: number, opts?: { maximumFractionDigits?: number; fromCurrency?: string }) => {
      const value = convertPrice(basePrice, opts?.fromCurrency);
      return formatNumberAsCurrency(value, currency, opts?.maximumFractionDigits ?? 0);
    },
    [convertPrice, currency]
  );

  const value: CurrencyContextValue = {
    currency,
    setCurrency,
    region: detectedRegion,
    regionPricing,
    detectedRegion,
    isIndianUser,
    convertPrice,
    formatPrice,
    rates,
    isLoading: isLoading || !isRegionLoaded,
    lastUpdated: data?.date,
    cacheStatus: data?.apiSource,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

/**
 * Parse a price string to a number
 * Handles formats like "₹38,500", "$129", etc.
 */
export function parsePrice(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const numeric = value.replace(/[^0-9.]/g, "");
  if (!numeric) return undefined;
  const parsed = Number(numeric);
  return Number.isNaN(parsed) ? undefined : parsed;
}

/**
 * Alias for backwards compatibility
 */
export function parseINRStringToNumber(value: string): number | undefined {
  return parsePrice(value);
}
