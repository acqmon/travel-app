import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const ActivityCategoryMapping = sequelize.define(
  "ActivityCategoryMapping",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    activityId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "activity_id",
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "category_id",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    tableName: "activity_category_mappings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ unique: true, fields: ["activity_id", "category_id"] }],
  },
);

export default ActivityCategoryMapping;
