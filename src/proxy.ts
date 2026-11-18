import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;
    if (path.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if ((path.startsWith("/cart") || path.startsWith("/rentals")) && role !== "member") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  { pages: { signIn: "/signin" } }
);

export const config = {
  matcher: ["/profile", "/cart/:path*", "/rentals/:path*", "/admin/:path*"],
};
