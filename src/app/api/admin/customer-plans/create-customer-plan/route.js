import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { CustomerPlan } from "@/server/models/index.js";
import { ROLE } from "@/constants/role.constant";

export const POST = withAuth(
  async (req) => {
    let body = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    let { name, price, credits } = body;

    // 🧹 normalize name
    const normalizedName = name?.trim();

    // 🔢 normalize numbers
    const priceNum = Number(price);
    const creditsNum = Number(credits);

    // 🔍 validation
    if (
      !normalizedName ||
      isNaN(priceNum) ||
      isNaN(creditsNum) ||
      priceNum <= 0 ||
      creditsNum <= 0
    ) {
      return NextResponse.json(
        {
          message: "Valid name, price and credits are required",
        },
        { status: 400 },
      );
    }

    // 🚫 prevent duplicate
    const existing = await CustomerPlan.findOne({
      where: { name: normalizedName },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Customer plan already exists" },
        { status: 409 },
      );
    }

    // ✅ create plan
    const plan = await CustomerPlan.create({
      name: normalizedName,
      price: priceNum,
      credits: creditsNum,
    });

    return NextResponse.json(
      {
        message: "Customer plan created successfully",
        data: plan,
      },
      { status: 201 },
    );
  },
  [ROLE.ADMIN],
);
