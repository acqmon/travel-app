import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import {
  PartnerActivity,
  PartnerProfile,
  Activity,
  Category,
} from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import { Op } from "sequelize";

export const POST = withAuth(
  async (req, _, user) => {
    let body = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const { search, status, isActive = true } = body;

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const offset = (page - 1) * limit;

    // Get partner profile
    const partnerProfile = await PartnerProfile.findOne({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    if (!partnerProfile) {
      return NextResponse.json(
        { message: "Partner profile not found" },
        { status: 404 },
      );
    }

    const whereClause = {
      partnerProfileId: partnerProfile.id,
    };

    if (typeof isActive === "boolean") {
      whereClause.isActive = isActive;
    }

    if (status) {
      whereClause.status = status;
    }

    const activityWhere = {};

    if (search?.trim()) {
      activityWhere[Op.or] = [
        { name: { [Op.like]: `%${search.trim()}%` } },
        { description: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const { rows, count } = await PartnerActivity.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Activity,
          attributes: ["id", "name", "description"],
          required: true,
          where: activityWhere,
          include: [
            {
              model: Category,
              attributes: ["id", "name"],
              through: { attributes: [] },
            },
          ],
        },
      ],
      limit,
      offset,
      distinct: true,
      order: [["created_at", "DESC"]],
    });

    const formatted = rows.map((item) => ({
      id: item.id,
      price: item.price,
      status: item.status,
      isActive: item.isActive,
      createdAt: item.createdAt,

      activity: {
        id: item.Activity.id,
        name: item.Activity.name,
        description: item.Activity.description,
      },

      categories:
        item.Activity?.Categories?.map((cat) => ({
          id: cat.id,
          name: cat.name,
        })) || [],
    }));

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      message: "Partner activities fetched successfully",
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
  [ROLE.PARTNER],
);
