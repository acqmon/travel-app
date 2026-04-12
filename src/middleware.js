// src/middleware.js

import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { checkRole } from "@/lib/role";
import { publicRoutes } from "@/config/routeAccess";
import { getDashboardByRole } from "@/lib/redirect";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Prevent loop
  if (pathname.startsWith("/unauthorized")) {
    return NextResponse.next();
  }

  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const { user, error } = await checkAuth(req);

  // ✅ 1. If user is logged in → block /login and /
  if (user && (pathname === "/login" || pathname === "/")) {
    console.log("req.url", req.url);
    const redirectUrl = new URL(getDashboardByRole(user.role), req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ 2. Public routes
  if (isPublic) {
    return NextResponse.next();
  }

  // ✅ 3. Protected routes → always go to clean /login
  if (error || !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ 4. Role check
  const allowed = checkRole(user, pathname);

  if (!allowed) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
