// src/middleware.js

import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { checkRole } from "@/lib/role";
import { publicRoutes } from "@/config/routeAccess";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Prevent loop
  if (pathname.startsWith("/unauthorized")) {
    return NextResponse.next();
  }

  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  //  Always check auth ONCE
  const { user, error } = await checkAuth(req);

  // 1. Public routes
  if (isPublic) {
    // If logged in, block access to login page
    if (user && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }

  // 2. Protected routes (not public)
  if (error || !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. Role check
  const allowed = checkRole(user, pathname);

  if (!allowed) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
