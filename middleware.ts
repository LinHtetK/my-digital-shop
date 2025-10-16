import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;
    const role = token?.role;
    // 🔹 Admin page protection
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // 🔹 Dashboard protection (for logged-in users only)
    if (pathname.startsWith("/dashboard") && !role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (pathname.startsWith("/seller")) {
      if (token?.role !== "SELLER" || token?.isVerifiedSeller !== true) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // allow logged in users
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/seller/:path*"], // pages to protect
};
