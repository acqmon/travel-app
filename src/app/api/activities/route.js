import { NextResponse } from "next/server";
import { Activity, PartnerActivity, PartnerProfile } from "@/server/models";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  // Build partner activity filter
  const partnerWhere = {
    status: PARTNER_ACTIVITY_STATUS.APPROVED,
    isActive: true,
  };

  if (priceMin || priceMax) {
    partnerWhere.price = {};
    if (priceMin) partnerWhere.price["$gte"] = Number(priceMin);
    if (priceMax) partnerWhere.price["$lte"] = Number(priceMax);
  }

  const activities = await Activity.findAll({
    where: {
      isActive: true,
    },
    include: [
      {
        model: PartnerActivity,
        required: true, // only return if approved partner exists
        where: partnerWhere,
        attributes: ["id", "price", "status"],
        include: [
          {
            model: PartnerProfile,
            attributes: ["id", "businessName", "city"],
          },
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return NextResponse.json(
    {
      message: "Activities fetched successfully",
      data: activities,
    },
    { status: 200 },
  );
}
