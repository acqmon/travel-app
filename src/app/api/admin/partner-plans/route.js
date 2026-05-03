import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { PartnerPlan } from "@/server/models/index.js";
import { ROLE } from "@/constants/role.constant";
import { Op } from "sequelize";

export const POST = withAuth(
  async (req) => {
    let body = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const { search, isActive = true } = body;

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const whereClause = {};

    // ✅ use model field
    if (typeof isActive === "boolean") {
      whereClause.isActive = isActive;
    }

    // search
    if (search?.trim()) {
      whereClause[Op.or] = [{ name: { [Op.like]: `%${search.trim()}%` } }];
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await PartnerPlan.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const formatted = rows.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      creditLimitPercent: item.creditLimitPercent,
      bookingLimit: item.bookingLimit,
      isActive: item.isActive,
      createdAt: item.createdAt,
    }));

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      message: "Partner plans fetched successfully",
      data: formatted,
      pagination: {
        total: count,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    });
  },
  [ROLE.ADMIN],
);
