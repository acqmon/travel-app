import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { CustomerPlan } from "@/server/models/index.js";
import { ROLE } from "@/constants/role.constant";

export const PUT = withAuth(
  async (req, { params }) => {
    const { id } = params;

    let body = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const plan = await CustomerPlan.findByPk(id);

    if (!plan) {
      return NextResponse.json(
        { message: "Customer plan not found" },
        { status: 404 },
      );
    }

    let { name, price, credits, isActive } = body;

    // 🧹 normalize
    const normalizedName = name?.trim();

    const priceNum = price !== undefined ? Number(price) : plan.price;

    const creditsNum = credits !== undefined ? Number(credits) : plan.credits;

    // 🔍 validation (only if fields provided)
    if (
      (name !== undefined && !normalizedName) ||
      (price !== undefined && (isNaN(priceNum) || priceNum <= 0)) ||
      (credits !== undefined && (isNaN(creditsNum) || creditsNum <= 0))
    ) {
      return NextResponse.json(
        {
          message: "Invalid input data",
        },
        { status: 400 },
      );
    }

    await plan.update({
      name: normalizedName ?? plan.name,
      price: priceNum,
      credits: creditsNum,
      isActive: isActive ?? plan.isActive, // ✅ fixed
    });

    return NextResponse.json(
      {
        message: "Customer plan updated successfully",
        data: plan,
      },
      { status: 200 },
    );
  },
  [ROLE.ADMIN],
);
