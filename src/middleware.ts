import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Job Ad Audit embed CSP.
 * If the landing repo already has middleware, MERGE this logic into it
 * and combine matchers — do not overwrite wholesale. See MERGE_NOTES.md.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const path = request.nextUrl.pathname;

  if (path === "/embed" || path.startsWith("/embed/")) {
    const ancestors =
      process.env.ALLOWED_FRAME_ANCESTORS ||
      "'self' https://hiredimensions.com https://www.hiredimensions.com http://localhost:* https://localhost:*";
    response.headers.set(
      "Content-Security-Policy",
      `frame-ancestors ${ancestors}`
    );
    response.headers.delete("X-Frame-Options");
  }

  return response;
}

export const config = {
  matcher: ["/embed", "/embed/:path*"],
};
