import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const PartnerPlan = sequelize.define(
  "PartnerPlan",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    creditLimitPercent: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: "credit_limit_percent",
    },

    bookingLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "booking_limit",
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
    tableName: "partner_plans",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default PartnerPlan;
