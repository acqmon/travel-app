import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { user: payload };
  } catch (err) {
    return { error: "INVALID_TOKEN" };
  }
}

export async function checkAuth(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return { error: "NO_TOKEN" };
  }

  return await verifyToken(token);
}
