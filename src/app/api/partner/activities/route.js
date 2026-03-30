import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { PartnerActivity, PartnerProfile, Activity } from "@/server/models";
import { ROLE } from "@/constants/role.constant";

export const GET = withAuth(
  async (_, __, user) => {
    const partnerProfile = await PartnerProfile.findOne({
      where: { userId: user.id },
    });

    const activities = await PartnerActivity.findAll({
      where: { partnerProfileId: partnerProfile.id },
      include: [
        {
          model: Activity,
          attributes: ["id", "name", "category"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return NextResponse.json(
      {
        message: "Partner activities fetched",
        data: activities,
      },
      { status: 200 },
    );
  },
  [ROLE.PARTNER],
);

export const POST = withAuth(
  async (req, _, user) => {
    const body = await req.json();
    const { activityId, price } = body;

    if (!activityId || !price) {
      return NextResponse.json(
        { message: "activityId and price are required" },
        { status: 400 },
      );
    }

    // Get partner profile
    const partnerProfile = await PartnerProfile.findOne({
      where: { userId: user.id },
    });

    if (!partnerProfile) {
      return NextResponse.json(
        { message: "Partner profile not found" },
        { status: 404 },
      );
    }

    // Check activity exists
    const activity = await Activity.findByPk(activityId);
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
        status: "pending",
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
