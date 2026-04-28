import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { User } from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import { Op } from "sequelize";

export const POST = withAuth(
  async (req) => {
    let body = {};

    try {
      body = await req.json();
    } catch (error) {
      body = {};
    }

    const { search, isActive = true, page = 1, limit = 10 } = body;

    const whereClause = {
      role: ROLE.CUSTOMER, // only customers
    };

    // Filter by active status
    if (typeof isActive === "boolean") {
      whereClause.isActive = isActive;
    }

    // Search by name or email
    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "role",
        "isActive",
        "createdAt",
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const formatted = rows.map((item) => ({
      id: item.id,
      name: `${item.firstName} ${item.lastName}`,
      email: item.email,
      role: item.role,
      isActive: item.isActive,
      joinedAt: item.createdAt,
    }));

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      message: "Customers fetched successfully",
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
