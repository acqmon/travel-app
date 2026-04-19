import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { User, PartnerProfile } from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import { Op } from "sequelize";

export const POST = withAuth(
  async (req) => {
    const body = await req.json();

    const { status, search, city, page = 1, limit = 10 } = body;

    const whereClause = {};

    if (status) whereClause.status = status;
    if (city) whereClause.city = city;

    if (search) {
      whereClause[Op.or] = [{ businessName: { [Op.like]: `%${search}%` } }];
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await PartnerProfile.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
          required: false,
          where: search
            ? {
                [Op.or]: [
                  { firstName: { [Op.like]: `%${search}%` } },
                  { lastName: { [Op.like]: `%${search}%` } },
                  { email: { [Op.like]: `%${search}%` } },
                ],
              }
            : undefined,
        },
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const formatted = rows.map((item) => ({
      id: item.id,
      name: `${item.User?.firstName || ""} ${item.User?.lastName || ""}`,
      email: item.User?.email,
      businessName: item.businessName,
      phone: item.phone,
      city: item.city,
      status: item.status,
    }));

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      message: "Partners fetched successfully",
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
