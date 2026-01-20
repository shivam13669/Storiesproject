/**
 * Region configuration
 * All prices are in INR (base currency)
 * Non-Indian users see prices with 20% markup applied
 */

export type RegionPricing = {
  /** ISO 3166-1 alpha-2 country code */
  countryCode: string;
  /** ISO 4217 currency code (recommended for the region) */
  baseCurrency: string;
  /** Base price for the product/service in INR */
  basePrice: number;
  /** Locale code for number/currency formatting */
  locale: string;
  /** Region name for display purposes */
  regionName: string;
};

/**
 * Global region configuration
 * Keys: ISO country codes (e.g., 'IN', 'US', 'GB', etc.)
 * Values: Region configuration with INR as base price
 *
 * All basePrice values are in INR. Non-Indian users see 20% markup applied.
 * Add new regions as needed - the system is scalable and country-agnostic
 */
export const REGION_PRICING_MAP: Record<string, RegionPricing> = {
  // Asia-Pacific
  IN: {
    countryCode: "IN",
    baseCurrency: "INR",
    basePrice: 9999,
    locale: "en-IN",
    regionName: "India",
  },
  SG: {
    countryCode: "SG",
    baseCurrency: "SGD",
    basePrice: 9999,
    locale: "en-SG",
    regionName: "Singapore",
  },
  MY: {
    countryCode: "MY",
    baseCurrency: "MYR",
    basePrice: 9999,
    locale: "ms-MY",
    regionName: "Malaysia",
  },
  ID: {
    countryCode: "ID",
    baseCurrency: "IDR",
    basePrice: 9999,
    locale: "id-ID",
    regionName: "Indonesia",
  },
  TH: {
    countryCode: "TH",
    baseCurrency: "THB",
    basePrice: 9999,
    locale: "th-TH",
    regionName: "Thailand",
  },
  AU: {
    countryCode: "AU",
    baseCurrency: "AUD",
    basePrice: 9999,
    locale: "en-AU",
    regionName: "Australia",
  },
  NZ: {
    countryCode: "NZ",
    baseCurrency: "NZD",
    basePrice: 9999,
    locale: "en-NZ",
    regionName: "New Zealand",
  },
  JP: {
    countryCode: "JP",
    baseCurrency: "JPY",
    basePrice: 9999,
    locale: "ja-JP",
    regionName: "Japan",
  },
  HK: {
    countryCode: "HK",
    baseCurrency: "HKD",
    basePrice: 9999,
    locale: "zh-HK",
    regionName: "Hong Kong",
  },
  CN: {
    countryCode: "CN",
    baseCurrency: "CNY",
    basePrice: 9999,
    locale: "zh-CN",
    regionName: "China",
  },

  // Middle East
  AE: {
    countryCode: "AE",
    baseCurrency: "AED",
    basePrice: 9999,
    locale: "ar-AE",
    regionName: "United Arab Emirates",
  },
  SA: {
    countryCode: "SA",
    baseCurrency: "SAR",
    basePrice: 9999,
    locale: "ar-SA",
    regionName: "Saudi Arabia",
  },
  QA: {
    countryCode: "QA",
    baseCurrency: "QAR",
    basePrice: 9999,
    locale: "ar-QA",
    regionName: "Qatar",
  },
  BH: {
    countryCode: "BH",
    baseCurrency: "BHD",
    basePrice: 9999,
    locale: "ar-BH",
    regionName: "Bahrain",
  },
  KW: {
    countryCode: "KW",
    baseCurrency: "KWD",
    basePrice: 9999,
    locale: "ar-KW",
    regionName: "Kuwait",
  },
  OM: {
    countryCode: "OM",
    baseCurrency: "OMR",
    basePrice: 9999,
    locale: "ar-OM",
    regionName: "Oman",
  },

  // Europe
  GB: {
    countryCode: "GB",
    baseCurrency: "GBP",
    basePrice: 9999,
    locale: "en-GB",
    regionName: "United Kingdom",
  },
  DE: {
    countryCode: "DE",
    baseCurrency: "EUR",
    basePrice: 9999,
    locale: "de-DE",
    regionName: "Germany",
  },
  FR: {
    countryCode: "FR",
    baseCurrency: "EUR",
    basePrice: 9999,
    locale: "fr-FR",
    regionName: "France",
  },
  IT: {
    countryCode: "IT",
    baseCurrency: "EUR",
    basePrice: 9999,
    locale: "it-IT",
    regionName: "Italy",
  },
  ES: {
    countryCode: "ES",
    baseCurrency: "EUR",
    basePrice: 9999,
    locale: "es-ES",
    regionName: "Spain",
  },
  SE: {
    countryCode: "SE",
    baseCurrency: "SEK",
    basePrice: 9999,
    locale: "sv-SE",
    regionName: "Sweden",
  },
  CH: {
    countryCode: "CH",
    baseCurrency: "CHF",
    basePrice: 9999,
    locale: "de-CH",
    regionName: "Switzerland",
  },
  NL: {
    countryCode: "NL",
    baseCurrency: "EUR",
    basePrice: 9999,
    locale: "nl-NL",
    regionName: "Netherlands",
  },

  // Americas
  US: {
    countryCode: "US",
    baseCurrency: "USD",
    basePrice: 9999,
    locale: "en-US",
    regionName: "United States",
  },
  CA: {
    countryCode: "CA",
    baseCurrency: "CAD",
    basePrice: 9999,
    locale: "en-CA",
    regionName: "Canada",
  },
  MX: {
    countryCode: "MX",
    baseCurrency: "MXN",
    basePrice: 9999,
    locale: "es-MX",
    regionName: "Mexico",
  },
  BR: {
    countryCode: "BR",
    baseCurrency: "BRL",
    basePrice: 9999,
    locale: "pt-BR",
    regionName: "Brazil",
  },

  // Africa
  ZA: {
    countryCode: "ZA",
    baseCurrency: "ZAR",
    basePrice: 9999,
    locale: "en-ZA",
    regionName: "South Africa",
  },
  EG: {
    countryCode: "EG",
    baseCurrency: "EGP",
    basePrice: 9999,
    locale: "ar-EG",
    regionName: "Egypt",
  },

  // South Asia
  PK: {
    countryCode: "PK",
    baseCurrency: "PKR",
    basePrice: 9999,
    locale: "ur-PK",
    regionName: "Pakistan",
  },
  LK: {
    countryCode: "LK",
    baseCurrency: "LKR",
    basePrice: 9999,
    locale: "si-LK",
    regionName: "Sri Lanka",
  },
  BD: {
    countryCode: "BD",
    baseCurrency: "BDT",
    basePrice: 9999,
    locale: "bn-BD",
    regionName: "Bangladesh",
  },
};

/** Default region (fallback) */
export const DEFAULT_REGION_CODE = "IN";

/**
 * Get pricing configuration for a country
 * If not found, returns default region
 */
export function getRegionPricing(countryCode?: string): RegionPricing {
  if (!countryCode) {
    return REGION_PRICING_MAP[DEFAULT_REGION_CODE]!;
  }

  const normalized = countryCode.toUpperCase();
  return REGION_PRICING_MAP[normalized] || REGION_PRICING_MAP[DEFAULT_REGION_CODE]!;
}

/**
 * Get all available regions (useful for admin/config pages)
 */
export function getAllRegions(): RegionPricing[] {
  return Object.values(REGION_PRICING_MAP);
}
