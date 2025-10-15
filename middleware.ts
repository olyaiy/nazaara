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

const COOKIE_NAME = "nza_city";
const MAX_AGE = 60 * 60 * 24 * 3; // 3 days

export function middleware(req: RequestWithGeo) {
  const pathname = req.nextUrl.pathname;
  const host = req.headers.get("host");
  const origin = req.headers.get("origin");
  const userAgent = req.headers.get("user-agent");
  

  // Log all cookies for debugging
  const allCookies = req.cookies.getAll();
  console.log(`[middleware] All cookies (${allCookies.length}):`, allCookies.map(c => `${c.name}=${c.value?.substring(0, 20)}...`));

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
  const existingCityCookie = req.cookies.get(COOKIE_NAME)?.value;
  if (existingCityCookie) {
    console.log("[middleware] city cookie already set:", existingCityCookie);
    console.log("[middleware] === REQUEST END (early return) ===");
    return NextResponse.next();
  }

  // Try to read city from edge geo data or headers
  console.log(`[middleware] === CITY DETECTION ===`);
  const geoCity = req.geo?.city;
  const vercelCity = req.headers.get("x-vercel-ip-city");
  const cfCity = req.headers.get("cf-ipcity");
  
  console.log("[middleware] Geo city:", geoCity);
  console.log("[middleware] Vercel IP city:", vercelCity);
  console.log("[middleware] Cloudflare city:", cfCity);
  
  const city = geoCity || vercelCity || cfCity || "";
  console.log("[middleware] Final detected city:", city || "<none>");

  const res = NextResponse.next();

  if (city) {
    console.log("[middleware] Setting nza_city cookie:", city);
    res.cookies.set({
      name: COOKIE_NAME,
      value: city,
      maxAge: MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
    });
  } else {
    console.log("[middleware] No city detected, not setting cookie");
  }

  console.log("[middleware] === REQUEST END ===");
  return res;
}

export const config = {
  runtime: "edge",
  // Run on home, events, admin routes, and the temporarily redirected pages
  matcher: ["/", "/events", "/about", "/bookings", "/admin/:path*"],
};
