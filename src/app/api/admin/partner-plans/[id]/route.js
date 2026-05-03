import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { PartnerPlan } from "@/server/models/index.js";
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

    const plan = await PartnerPlan.findByPk(id);

    if (!plan) {
      return NextResponse.json(
        { message: "Partner plan not found" },
        { status: 404 },
      );
    }

    let { name, price, creditLimitPercent, bookingLimit, isActive } = body;

    // 🧹 normalize
    const normalizedName = name?.trim();

    const priceNum = price !== undefined ? Number(price) : plan.price;

    const creditPercentNum =
      creditLimitPercent !== undefined
        ? Number(creditLimitPercent)
        : plan.creditLimitPercent;

    const bookingLimitNum =
      bookingLimit !== undefined ? Number(bookingLimit) : plan.bookingLimit;

    // 🔍 validation (only if fields provided)
    if (
      (name !== undefined && !normalizedName) ||
      (price !== undefined && (isNaN(priceNum) || priceNum <= 0)) ||
      (creditLimitPercent !== undefined &&
        (isNaN(creditPercentNum) ||
          creditPercentNum <= 0 ||
          creditPercentNum > 100)) ||
      (bookingLimit !== undefined &&
        (isNaN(bookingLimitNum) || bookingLimitNum <= 0))
    ) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 },
      );
    }

    await plan.update({
      name: normalizedName ?? plan.name,
      price: priceNum,
      creditLimitPercent: creditPercentNum,
      bookingLimit: bookingLimitNum,
      isActive: isActive ?? plan.isActive,
    });

    return NextResponse.json(
      {
        message: "Partner plan updated successfully",
        data: plan,
      },
      { status: 200 },
    );
  },
  [ROLE.ADMIN],
);
