import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";

export const POST = withAuth(async (req, ctx, user) => {
  console.log(`User logged out: ${user.id}`);

  return NextResponse.json({
    message: "User logged out successfully",
    code: 200,
  });
});
