import { NextRequest, NextResponse } from "next/server";

interface RequestWithGeo extends NextRequest {
  geo?: {
    city?: string;
    country?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
  };
}

const COOKIE_NAME_CITY = "nza_city";
const COOKIE_NAME_COUNTRY = "nza_country";
const MAX_AGE = 60 * 60 * 24 * 3; // 3 days

export function middleware(req: RequestWithGeo) {
  console.log("\n[middleware] ========== MIDDLEWARE START ==========");
  const pathname = req.nextUrl.pathname;
  const host = req.headers.get("host");
  
  console.log("[middleware] Request details:", {
    pathname,
    host,
    method: req.method
  });

  // Log all cookies for debugging
  const allCookies = req.cookies.getAll();
  console.log(`[middleware] All cookies present (${allCookies.length}):`, allCookies.map(c => `${c.name}=${c.value?.substring(0, 20)}...`));

  // Admin route protection
  if (pathname.startsWith("/admin") && pathname !== "/admin/auth") {
    console.log(`[middleware] === ADMIN ROUTE PROTECTION ===`);
    console.log(`[middleware] Checking admin route: ${pathname}`);
    
    // Check for both secure and non-secure cookie names
    const sessionToken = req.cookies.get("better-auth.session_token")?.value || 
                         req.cookies.get("__Secure-better-auth.session_token")?.value;
    const sessionCookie = req.cookies.get("better-auth.session")?.value ||
                         req.cookies.get("__Secure-better-auth.session")?.value;
    
    console.log(`[middleware] Session token exists: ${!!sessionToken}`);
    console.log(`[middleware] Session token length: ${sessionToken?.length || 0}`);
    console.log(`[middleware] Session token preview: ${sessionToken?.substring(0, 20)}...`);
    console.log(`[middleware] Session cookie exists: ${!!sessionCookie}`);
    console.log(`[middleware] Session cookie length: ${sessionCookie?.length || 0}`);
    console.log(`[middleware] Checked cookie names: better-auth.session_token, __Secure-better-auth.session_token`);
    
    if (!sessionToken) {
      console.log("[middleware] ❌ No session token found, redirecting to admin auth");
      console.log(`[middleware] Redirect URL: ${new URL("/admin/auth", req.url)}`);
      return NextResponse.redirect(new URL("/admin/auth", req.url));
    }
    
    console.log("[middleware] ✅ Session token found, allowing access to admin route");
    // Note: Full role verification is done server-side in the admin pages
    // This is just a basic check for session existence
  }
  


  // If cookie already present, proceed without changes
  const existingCityCookie = req.cookies.get(COOKIE_NAME_CITY)?.value;
  const existingCountryCookie = req.cookies.get(COOKIE_NAME_COUNTRY)?.value;
  console.log("\n[middleware] === GEO COOKIE CHECK ===");
  console.log("[middleware] Checking for existing geo cookies");
  console.log("[middleware]   - nza_city:", existingCityCookie || "<not set>");
  console.log("[middleware]   - nza_country:", existingCountryCookie || "<not set>");
  
  if (existingCityCookie && existingCountryCookie) {
    console.log("[middleware] ✅ Both geo cookies already set");
    console.log("[middleware] Skipping geo detection (cookies valid for", MAX_AGE / 60 / 60 / 24, "days)");
    console.log("[middleware] These will be used for smart event selection");
    console.log("[middleware] ========== MIDDLEWARE END (early return) ==========\n");
    return NextResponse.next();
  }
  
  console.log("[middleware] ❌ Geo cookies missing or incomplete");

  // Try to read city and country from edge geo data or headers
  console.log("\n[middleware] === GEO DETECTION ===");
  console.log("[middleware] Attempting to detect user's location from multiple sources:");
  
  const geoCity = req.geo?.city;
  const geoCountry = req.geo?.country;
  const vercelCity = req.headers.get("x-vercel-ip-city");
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  const cfCity = req.headers.get("cf-ipcity");
  const cfCountry = req.headers.get("cf-ipcountry");
  
  console.log("[middleware] Geo detection sources:");
  console.log("[middleware]   - req.geo (Next.js edge):", { city: geoCity || "<not available>", country: geoCountry || "<not available>" });
  console.log("[middleware]   - Vercel IP headers:", { city: vercelCity || "<not available>", country: vercelCountry || "<not available>" });
  console.log("[middleware]   - Cloudflare headers:", { city: cfCity || "<not available>", country: cfCountry || "<not available>" });
  
  const city = geoCity || vercelCity || cfCity || "";
  const country = geoCountry || vercelCountry || cfCountry || "";
  
  console.log("\n[middleware] === GEO DETECTION RESULT ===");
  if (city || country) {
    console.log("[middleware] ✅ Location detected:");
    console.log("[middleware]   - City:", city || "<not detected>");
    console.log("[middleware]   - Country:", country || "<not detected>");
    console.log("[middleware] Detection method:", geoCity ? "Next.js edge geo" : vercelCity ? "Vercel IP headers" : "Cloudflare headers");
  } else {
    console.log("[middleware] ❌ No location detected from any source");
    console.log("[middleware] User will see default event (first upcoming)");
  }

  const res = NextResponse.next();

  console.log("\n[middleware] === COOKIE SETTING ===");
  let cookiesSet = 0;
  
  if (city) {
    console.log("[middleware] ✅ Setting 'nza_city' cookie:", city);
    res.cookies.set({
      name: COOKIE_NAME_CITY,
      value: city,
      maxAge: MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
    });
    cookiesSet++;
  }
  
  if (country) {
    console.log("[middleware] ✅ Setting 'nza_country' cookie:", country);
    res.cookies.set({
      name: COOKIE_NAME_COUNTRY,
      value: country,
      maxAge: MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
    });
    cookiesSet++;
  }
  
  if (cookiesSet > 0) {
    console.log("[middleware] Cookie details:", {
      maxAge: `${MAX_AGE}s (${MAX_AGE / 60 / 60 / 24} days)`,
      httpOnly: true,
      sameSite: "lax"
    });
    console.log("[middleware] These will enable smart geographical event selection");
  } else {
    console.log("[middleware] ⊘ Not setting cookies (no location detected)");
    console.log("[middleware] User will see default events (chronological order)");
  }

  console.log("[middleware] ========== MIDDLEWARE END ==========\n");
  return res;
}

export const config = {
  runtime: "edge",
  // Run on home, events, admin routes, and the temporarily redirected pages
  matcher: ["/", "/events", "/about", "/bookings", "/admin/:path*"],
};
