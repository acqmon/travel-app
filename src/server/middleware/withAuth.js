// withAuth.js

import { NextResponse } from "next/server";
import { verifyAuth } from "./auth";
import { requireRole } from "./role";

export function withAuth(handler, roles = []) {
  return async (req, context) => {
    try {
      const { user, error } = verifyAuth(req);

      if (error) {
        return NextResponse.json({ message: error }, { status: 401 });
      }

      if (roles.length && !requireRole(user, roles)) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      return await handler(req, context, user);
    } catch (error) {
      console.error("API Error:", error);

      return NextResponse.json(
        {
          message: error.message || "Internal server error",
        },
        { status: 500 },
      );
    }
  };
}
