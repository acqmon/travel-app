import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { Activity } from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import { Op } from "sequelize";

export const GET = withAuth(
  async (req) => {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";

    const whereClause = {
      isActive: true, // only active for dropdown
    };

    if (search.trim()) {
      whereClause.name = {
        [Op.like]: `%${search.trim()}%`,
      };
    }

    const activities = await Activity.findAll({
      where: whereClause,
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
      limit: 100, // prevent overload
    });

    return NextResponse.json({
      message: "Activity list fetched successfully",
      data: activities.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    });
  },
  [
    ROLE.PARTNER, // add other roles who need dropdown
  ],
);
