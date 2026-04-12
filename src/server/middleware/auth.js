import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyAuth(req) {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return { error: "Unauthorized" };
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return { user: decoded };
  } catch (error) {
    return { error: "Invalid or expired token" };
  }
}
