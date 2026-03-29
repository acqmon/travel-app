import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/server/models";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Find user
    const user = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 3. Check password
    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // 5. Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          token,
        },
      },
      { status: 200 },
    );

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
