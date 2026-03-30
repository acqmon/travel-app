import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { Activity } from "@/server/models";
import { ROLE } from "@/constants/role.constant";

export const PATCH = withAuth(
  async (req, { params }) => {
    const { id } = params;
    const body = await req.json();

    const { name, description, category, isActive } = body;

    // Check if activity exists
    const activity = await Activity.findByPk(id);

    if (!activity) {
      return NextResponse.json(
        { message: "Activity not found" },
        { status: 404 },
      );
    }

    // If name is being updated → normalize + check duplicate
    if (name) {
      const normalizedName = name.trim();

      const existing = await Activity.findOne({
        where: { name: normalizedName },
      });

      if (existing && existing.id !== id) {
        return NextResponse.json(
          { message: "Activity with this name already exists" },
          { status: 409 },
        );
      }

      activity.name = normalizedName;
    }

    // Update allowed fields only
    if (description !== undefined) activity.description = description;
    if (category !== undefined) activity.category = category;
    if (isActive !== undefined) activity.isActive = isActive;

    await activity.save();

    return NextResponse.json(
      {
        message: "Activity updated successfully",
        data: activity,
      },
      { status: 200 },
    );
  },
  [ROLE.ADMIN],
);

export const DELETE = withAuth(
  async (req, { params }) => {
    const { id } = params;

    const activity = await Activity.findByPk(id);

    if (!activity) {
      return NextResponse.json(
        { message: "Activity not found" },
        { status: 404 },
      );
    }

    // Soft delete
    activity.isActive = false;
    await activity.save();

    return NextResponse.json(
      {
        message: "Activity deleted successfully",
      },
      { status: 200 },
    );
  },
  [ROLE.ADMIN],
);
