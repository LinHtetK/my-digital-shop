import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // 🔹 Admin page protection
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // 🔹 Dashboard protection (for logged-in users only)
    if (pathname.startsWith("/dashboard") && !role) {
      return NextResponse.redirect(new URL("/login", req.url));
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
  matcher: ["/admin/:path*", "/dashboard/:path*"], // pages to protect
};
