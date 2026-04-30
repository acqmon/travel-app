import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { PartnerActivity, PartnerProfile, Activity } from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant";

export const POST = withAuth(
  async (req, _, user) => {
    let body = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const { activityId, price } = body;

    // Validation
    if (!activityId) {
      return NextResponse.json(
        { message: "activityId is required" },
        { status: 400 },
      );
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      return NextResponse.json(
        { message: "Valid price is required" },
        { status: 400 },
      );
    }

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

    // Check activity exists and active
    const activity = await Activity.findOne({
      where: {
        id: activityId,
        isActive: true,
      },
    });

    if (!activity) {
      return NextResponse.json(
        { message: "Activity not found" },
        { status: 404 },
      );
    }

    try {
      const partnerActivity = await PartnerActivity.create({
        partnerProfileId: partnerProfile.id,
        activityId,
        price,
        status: PARTNER_ACTIVITY_STATUS.PENDING,
      });

      return NextResponse.json(
        {
          message: "Activity submitted for approval",
          data: partnerActivity,
        },
        { status: 201 },
      );
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return NextResponse.json(
          { message: "You already added this activity" },
          { status: 409 },
        );
      }

      throw error;
    }
  },
  [ROLE.PARTNER],
);
