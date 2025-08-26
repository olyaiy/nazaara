import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "nza_city";
const MAX_AGE = 60 * 60 * 24 * 3; // 3 days

export function middleware(req: NextRequest) {
  // Temporary redirects for About and Bookings pages
  const pathname = req.nextUrl.pathname;
  if (pathname === "/about" || pathname === "/bookings") {
    console.log(`[middleware] Redirecting from ${pathname} to home (temporary)`);
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If cookie already present, proceed without changes
  if (req.cookies.get(COOKIE_NAME)?.value) {
    console.log("[middleware] city cookie already set:", req.cookies.get(COOKIE_NAME)?.value);
    return NextResponse.next();
  }

  // Try to read city from edge geo data or headers
  const city =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).geo?.city ||
    req.headers.get("x-vercel-ip-city") ||
    req.headers.get("cf-ipcity") || // Cloudflare fallback
    "";

  console.log("[middleware] detected city from headers/geo:", city || "<none>");

  const res = NextResponse.next();

  if (city) {
    console.log("[middleware] setting nza_city cookie:", city);
    res.cookies.set({
      name: COOKIE_NAME,
      value: city,
      maxAge: MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return res;
}

export const config = {
  runtime: "edge",
  // Run on home, events, and the temporarily redirected pages
  matcher: ["/", "/events", "/about", "/bookings"],
};
