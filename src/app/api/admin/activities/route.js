import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { Activity } from "@/server/models";
import { ROLE } from "@/constants/role.constant";

export const GET = withAuth(async () => {
  const activities = await Activity.findAll({
    order: [["created_at", "DESC"]],
  });

  return NextResponse.json(
    {
      message: "Activities fetched successfully",
      data: activities,
    },
    { status: 200 },
  );
}, [ROLE.ADMIN]);

export const POST = withAuth(
  async (req) => {
    const body = await req.json();

    const { name, description, category } = body;

    // Basic validation
    if (!name || !category) {
      return NextResponse.json(
        { message: "Name and category are required" },
        { status: 400 },
      );
    }

    // Normalize input
    const normalizedName = name.trim();

    // Prevent duplicate activity
    const existing = await Activity.findOne({
      where: { name: normalizedName },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Activity already exists" },
        { status: 409 },
      );
    }

    // Create activity (whitelisted fields only)
    const activity = await Activity.create({
      name: normalizedName,
      description,
      category,
    });

    return NextResponse.json(
      {
        message: "Activity created successfully",
        data: activity,
      },
      { status: 201 },
    );
  },
  [ROLE.ADMIN],
);
