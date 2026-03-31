import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { PartnerActivity, Activity, PartnerProfile } from "@/server/models";
import { ROLE } from "@/constants/role.constant";

export const GET = withAuth(async () => {
  const data = await PartnerActivity.findAll({
    include: [
      {
        model: Activity,
        attributes: ["id", "name"],
      },
      {
        model: PartnerProfile,
        attributes: ["id", "businessName"],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return NextResponse.json(
    {
      message: "Partner activities fetched",
      data,
    },
    { status: 200 },
  );
}, [ROLE.ADMIN]);
