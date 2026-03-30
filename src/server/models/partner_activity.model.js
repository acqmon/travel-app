import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant.js";

const PartnerActivity = sequelize.define(
  "PartnerActivity",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    partnerProfileId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "partner_profile_id",
    },
    activityId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "activity_id",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        PARTNER_ACTIVITY_STATUS.PENDING,
        PARTNER_ACTIVITY_STATUS.APPROVED,
        PARTNER_ACTIVITY_STATUS.REJECTED,
      ),
      defaultValue: PARTNER_ACTIVITY_STATUS.PENDING,
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
    tableName: "partner_activities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ unique: true, fields: ["partner_profile_id", "activity_id"] }],
  },
);

export default PartnerActivity;
