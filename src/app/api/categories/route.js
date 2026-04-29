import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { Category } from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import { Op } from "sequelize";

export const POST = withAuth(
  async (req) => {
    let body = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const { name, description } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 },
      );
    }

    // Check duplicate category name
    const existingCategory = await Category.findOne({
      where: {
        name: {
          [Op.like]: name.trim(),
        },
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 },
      );
    }

    // Create category
    const category = await Category.create({
      name: name.trim(),
      description: description?.trim() || null,
    });

    return NextResponse.json({
      message: "Category created successfully",
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.isActive,
      },
    });
  },
  [ROLE.ADMIN],
);
