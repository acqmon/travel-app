import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { User, PartnerProfile } from "@/server/models";
import { ROLE } from "@/constants/role.constant";

export const POST = withAuth(
  async (req) => {
    const body = await req.json();

    const {
      status,
      search, // name/email/business
      city,
      page = 1,
      limit = 10,
    } = body;

    const whereClause = {};

    // Status filter
    if (status) {
      whereClause.status = status;
    }

    // City filter
    if (city) {
      whereClause.city = city;
    }

    const offset = (page - 1) * limit;

    const partners = await PartnerProfile.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
          where: search
            ? {
                // 🔍 search in user fields
                [Op.or]: [
                  { firstName: { [Op.iLike]: `%${search}%` } },
                  { lastName: { [Op.iLike]: `%${search}%` } },
                  { email: { [Op.iLike]: `%${search}%` } },
                ],
              }
            : undefined,
        },
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const formatted = partners.map((item) => ({
      id: item.id,
      name: `${item.User.firstName} ${item.User.lastName}`,
      email: item.User.email,
      businessName: item.businessName,
      phone: item.phone,
      city: item.city,
      status: item.status,
    }));

    return NextResponse.json(
      {
        message: "Partners fetched successfully",
        data: formatted,
      },
      { status: 200 },
    );
  },
  [ROLE.ADMIN],
);
