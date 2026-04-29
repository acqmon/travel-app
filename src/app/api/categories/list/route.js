import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { Category } from "@/server/models";
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

    // page & limit from query params
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const whereClause = {};

    // Active filter
    if (typeof isActive === "boolean") {
      whereClause.isActive = isActive;
    }

    // Search filter
    if (search?.trim()) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search.trim()}%` } },
        { description: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await Category.findAndCountAll({
      where: whereClause,
      attributes: ["id", "name", "description", "isActive", "createdAt"],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const formatted = rows.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      isActive: item.isActive,
      createdAt: item.createdAt,
    }));

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      message: "Categories fetched successfully",
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
