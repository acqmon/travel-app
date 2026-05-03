import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { PartnerPlan } from "@/server/models/index.js";
import { ROLE } from "@/constants/role.constant";

// ✅ POST (create partner plan)
export const POST = withAuth(
  async (req) => {
    let body = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    let { name, price, creditLimitPercent, bookingLimit } = body;

    // 🧹 normalize
    const normalizedName = name?.trim();

    const priceNum = Number(price);
    const creditPercentNum = Number(creditLimitPercent);
    const bookingLimitNum = Number(bookingLimit);

    // 🔍 validation
    if (
      !normalizedName ||
      isNaN(priceNum) ||
      isNaN(creditPercentNum) ||
      isNaN(bookingLimitNum) ||
      priceNum <= 0 ||
      creditPercentNum <= 0 ||
      creditPercentNum > 100 ||
      bookingLimitNum <= 0
    ) {
      return NextResponse.json(
        {
          message:
            "Valid name, price, credit limit percent (1-100), and booking limit are required",
        },
        { status: 400 },
      );
    }

    // 🚫 prevent duplicate
    const existing = await PartnerPlan.findOne({
      where: { name: normalizedName },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Partner plan already exists" },
        { status: 409 },
      );
    }

    // ✅ create plan
    const plan = await PartnerPlan.create({
      name: normalizedName,
      price: priceNum,
      creditLimitPercent: creditPercentNum,
      bookingLimit: bookingLimitNum,
    });

    return NextResponse.json(
      {
        message: "Partner plan created successfully",
        data: plan,
      },
      { status: 201 },
    );
  },
  [ROLE.ADMIN],
);
