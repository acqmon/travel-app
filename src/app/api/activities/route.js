import { NextResponse } from "next/server";
import { withAuth } from "@/server/middleware/withAuth";
import { Activity, Category, ActivityCategoryMapping } from "@/server/models";
import { ROLE } from "@/constants/role.constant";
import sequelize from "@/server/db/sequelize";
import { Op } from "sequelize";

export const POST = withAuth(
  async (req) => {
    const transaction = await sequelize.transaction();

    try {
      const body = await req.json();

      const { name, description, categoryIds = [] } = body;

      if (!name) {
        await transaction.rollback();
        return NextResponse.json(
          { message: "Activity name is required" },
          { status: 400 },
        );
      }

      const existing = await Activity.findOne({
        where: {
          name: {
            [Op.like]: name,
          },
        },
        transaction,
      });

      if (existing) {
        await transaction.rollback();
        return NextResponse.json(
          { message: "Activity already exists" },
          { status: 400 },
        );
      }

      const activity = await Activity.create(
        {
          name,
          description,
        },
        { transaction },
      );

      if (categoryIds.length > 0) {
        const categories = await Category.findAll({
          where: {
            id: categoryIds,
            isActive: true,
          },
          transaction,
        });

        if (categories.length !== categoryIds.length) {
          await transaction.rollback();
          return NextResponse.json(
            { message: "Some categories are invalid" },
            { status: 400 },
          );
        }

        const mappings = categoryIds.map((categoryId) => ({
          activityId: activity.id,
          categoryId,
        }));

        await ActivityCategoryMapping.bulkCreate(mappings, {
          transaction,
        });
      }

      await transaction.commit();

      return NextResponse.json({
        message: "Activity created successfully",
        data: activity,
      });
    } catch (error) {
      await transaction.rollback();

      return NextResponse.json(
        {
          message: "Failed to create activity",
          error: error.message,
        },
        { status: 500 },
      );
    }
  },
  [ROLE.ADMIN],
);
