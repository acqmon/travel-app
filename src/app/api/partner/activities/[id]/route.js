import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { PartnerActivity, PartnerProfile } from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant";

export const PATCH = withAuth(
  async (req, { params }, user) => {
    const { id } = params;
    const body = await req.json();
    const { price } = body;

    const partnerProfile = await PartnerProfile.findOne({
      where: { userId: user.id },
    });

    const partnerActivity = await PartnerActivity.findByPk(id);

    if (!partnerActivity) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // Ensure ownership
    if (partnerActivity.partnerProfileId !== partnerProfile.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (price !== undefined) {
      partnerActivity.price = price;
    }

    // Reset approval if updated
    partnerActivity.status = PARTNER_ACTIVITY_STATUS.PENDING;

    await partnerActivity.save();

    return NextResponse.json(
      {
        message: "Updated, pending approval again",
        data: partnerActivity,
      },
      { status: 200 },
    );
  },
  [ROLE.PARTNER],
);

export const DELETE = withAuth(
  async (_, { params }, user) => {
    const { id } = params;

    const partnerProfile = await PartnerProfile.findOne({
      where: { userId: user.id },
    });

    const partnerActivity = await PartnerActivity.findByPk(id);

    if (!partnerActivity) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (partnerActivity.partnerProfileId !== partnerProfile.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    partnerActivity.isActive = false;
    await partnerActivity.save();

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 },
    );
  },
  [ROLE.PARTNER],
);
