import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { User, PartnerProfile } from "@/server/models";
import { ROLE } from "@/constants/role.constant";

export const GET = withAuth(
  async (req) => {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let whereClause = {};

    if (status === "PENDING") {
      whereClause = {
        isVerified: false,
        isActive: true,
      };
    } else if (status === "APPROVED") {
      whereClause = {
        isVerified: true,
        isActive: true,
      };
    } else if (status === "REJECTED") {
      whereClause = {
        isActive: false,
      };
    }

    const partners = await PartnerProfile.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    const formatted = partners.map((item) => {
      let status = "PENDING";

      if (!item.isActive) {
        status = "REJECTED";
      } else if (item.isVerified) {
        status = "APPROVED";
      }

      return {
        id: item.id,
        name: `${item.User.firstName} ${item.User.lastName}`,
        email: item.User.email,
        businessName: item.businessName,
        phone: item.phone,
        city: item.city,
        status,
      };
    });

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
