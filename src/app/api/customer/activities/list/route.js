import { NextResponse } from "next/server";
import {
  PartnerActivity,
  PartnerProfile,
  Activity,
  Category,
} from "@/server/models";
import { Op } from "sequelize";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant";

export async function POST(req) {
  let body = {};

  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const { search = "", categoryId, minPrice, maxPrice } = body;

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const offset = (page - 1) * limit;

  // 🔍 Activity search
  const activityWhere = {};

  if (search.trim()) {
    activityWhere[Op.or] = [
      { name: { [Op.like]: `%${search.trim()}%` } },
      { description: { [Op.like]: `%${search.trim()}%` } },
    ];
  }

  // 💰 Price filter
  const priceWhere = {};

  if (minPrice !== undefined && maxPrice !== undefined) {
    priceWhere.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  } else if (minPrice !== undefined) {
    priceWhere.price = { [Op.gte]: minPrice };
  } else if (maxPrice !== undefined) {
    priceWhere.price = { [Op.lte]: maxPrice };
  }

  const { rows, count } = await PartnerActivity.findAndCountAll({
    where: {
      status: PARTNER_ACTIVITY_STATUS.APPROVED,
      isActive: true,
      ...priceWhere,
    },
    include: [
      {
        model: PartnerProfile,
        attributes: ["id"],
        required: true,
        where: {
          isActive: true,
        },
      },
      {
        model: Activity,
        attributes: ["id", "name", "description"],
        required: true,
        where: activityWhere,
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            through: { attributes: [] },
            ...(categoryId && {
              where: { id: categoryId },
              required: true,
            }),
          },
        ],
      },
    ],
    limit,
    offset,
    distinct: true,
    order: [["created_at", "DESC"]],
  });

  const formatted = rows.map((item) => ({
    id: item.id,
    price: item.price,

    activity: {
      id: item.Activity.id,
      name: item.Activity.name,
      description: item.Activity.description,
    },

    categories:
      item.Activity?.Categories?.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })) || [],
  }));

  const totalPages = limit ? Math.ceil(count / limit) : 1;

  return NextResponse.json({
    message: "Activities fetched successfully",
    data: formatted,
    pagination: {
      total: count,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  });
}
