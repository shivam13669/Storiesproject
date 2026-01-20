export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export const INR_BASE_CODE = "INR" as const;

export const FLAG_BY_CURRENCY: Record<string, string> = {
  INR: "in",
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  AED: "ae",
  SGD: "sg",
  AUD: "au",
  CAD: "ca",
  JPY: "jp",
  CNY: "cn",
  CHF: "ch",
  HKD: "hk",
  NZD: "nz",
  SEK: "se",
  NOK: "no",
  DKK: "dk",
  ZAR: "za",
  THB: "th",
  MYR: "my",
  IDR: "id",
  LKR: "lk",
  BHD: "bh",
  QAR: "qa",
  OMR: "om",
  KWD: "kw",
};

export const CURRENCIES: Currency[] = [
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "USD", name: "United States Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "AED", name: "United Arab Emirates Dirham", symbol: "د.إ" },
  { code: "SGD", name: "Singapore Dollar", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "$" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع." },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: ".د.ك" },
];

export const COMMON_CODES = [
  "INR",
  "USD",
  "EUR",
  "SGD",
  "AUD",
  "GBP",
  "AED",
] as const;

export function getCurrencyByCode(code: string | undefined): Currency {
  const found = CURRENCIES.find((c) => c.code === code);
  return found || CURRENCIES[0];
}

export function parseINRStringToNumber(value: string): number | undefined {
  const numeric = value.replace(/[^0-9.]/g, "");
  if (!numeric) return undefined;
  const parsed = Number(numeric);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function formatNumberAsCurrency(value: number, code: string, maximumFractionDigits = 0) {
  const roundedValue = Math.round(value);

  // Keep INR exactly as native currency formatting
  if (code === INR_BASE_CODE) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: code,
        maximumFractionDigits,
      }).format(roundedValue);
    } catch {
      return `${roundedValue.toLocaleString(undefined, { maximumFractionDigits })} ${getCurrencyByCode(code).symbol || ""}`.trim();
    }
  }

  // For all other currencies, show ISO code followed by a space and the amount
  const formattedNumber = new Intl.NumberFormat(undefined, {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(roundedValue);
  return `${code} ${formattedNumber}`;
}
