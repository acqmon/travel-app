import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";

export const POST = withAuth(async (req, ctx, user) => {
  const response = NextResponse.json({
    message: "User logged out successfully",
    code: 200,
  });

  // Clear the cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // expire immediately
  });

  return response;
});
