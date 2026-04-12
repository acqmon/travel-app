import { NextResponse } from "next/server";
import { BusinessType } from "@/server/models";

// GET master list
export const GET = async () => {
  try {
    const businessTypes = await BusinessType.findAll({
      where: { isActive: true },
      order: [["created_at", "DESC"]],
    });

    return NextResponse.json({
      message: "Business types fetched successfully",
      code: 200,
      data: businessTypes,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch business types" },
      { status: 500 },
    );
  }
};
