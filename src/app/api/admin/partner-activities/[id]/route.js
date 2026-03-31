import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { PartnerActivity } from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant";

export const PATCH = withAuth(
  async (req, { params }) => {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    // Validate status
    const allowed = [
      PARTNER_ACTIVITY_STATUS.APPROVED,
      PARTNER_ACTIVITY_STATUS.REJECTED,
    ];

    if (!allowed.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const partnerActivity = await PartnerActivity.findByPk(id);

    if (!partnerActivity) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    partnerActivity.status = status;
    await partnerActivity.save();

    return NextResponse.json(
      {
        message: `Activity ${status}`,
        data: partnerActivity,
      },
      { status: 200 },
    );
  },
  [ROLE.ADMIN],
);
