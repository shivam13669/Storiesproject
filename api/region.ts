import { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Serverless API endpoint for region detection
 * Reads the x-vercel-ip-country header set by Vercel edge
 * This endpoint must run on the server/edge to access request headers
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "public, max-age=3600");

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get country from Vercel's x-vercel-ip-country header
  // This header is set automatically by Vercel's edge network
  // Format: "IN" (ISO 3166-1 alpha-2 country code)
  const countryFromHeader = req.headers["x-vercel-ip-country"] as string | undefined;
  const country = countryFromHeader ? countryFromHeader.toUpperCase() : null;

  // Also capture other useful information
  const ipAddress = req.headers["x-forwarded-for"] as string | undefined;

  // Return region detection result
  return res.status(200).json({
    region: country || null,
    header: "x-vercel-ip-country",
    debug: {
      ip: ipAddress || null,
      timestamp: new Date().toISOString(),
    },
  });
}
