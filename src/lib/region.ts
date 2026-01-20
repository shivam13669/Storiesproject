import { DEFAULT_REGION_CODE } from "./pricing";

const STORAGE_KEY = "sb_region";

/**
 * Detect user's region/country
 * Priority order:
 * 1. Saved preference in localStorage
 * 2. Vercel edge/server header (x-vercel-ip-country)
 * 3. Browser geolocation API
 * 4. Default fallback
 */
export async function detectUserRegion(): Promise<string> {
  // Check for saved preference first
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return saved;
    }
  } catch {
    // localStorage might not be available
  }

  // Try to get from Vercel header via API
  try {
    const region = await getRegionFromVercelHeader();
    if (region) {
      return region;
    }
  } catch (error) {
    console.log("[REGION] Failed to fetch from Vercel header:", error);
  }

  // Fallback to default
  return DEFAULT_REGION_CODE;
}

/**
 * Get region from Vercel's x-vercel-ip-country header
 * This requires a server/edge endpoint to read the header
 * since headers are not accessible from client-side JavaScript
 */
async function getRegionFromVercelHeader(): Promise<string | null> {
  try {
    // Try to fetch from our region detection API
    const response = await fetch("/api/region", {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (response.ok) {
      const data = (await response.json()) as { region?: string };
      if (data.region) {
        console.log("[REGION] Detected from Vercel header:", data.region);
        return data.region;
      }
    }
  } catch (error) {
    console.log("[REGION] Region API not available:", error);
  }

  return null;
}

/**
 * Save user's region preference
 * Called when user manually switches region/currency picker
 */
export function saveRegionPreference(countryCode: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, countryCode);
  } catch {
    console.log("[REGION] Failed to save region preference");
  }
}

/**
 * Clear saved region preference
 * Falls back to auto-detection
 */
export function clearRegionPreference(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.log("[REGION] Failed to clear region preference");
  }
}

/**
 * Get user's region from localStorage (synchronously)
 * Use detectUserRegion() for async detection with full fallback chain
 */
export function getSavedRegion(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
