import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const PartnerProfile = sequelize.define(
  "PartnerProfile",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: "user_id",
    },
    businessTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "business_type_id",
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternatePhone: {
      type: DataTypes.STRING,
      field: "alternate_phone",
    },
    contactEmail: {
      type: DataTypes.STRING,
      field: "contact_email",
      validate: { isEmail: true },
    },
    website: {
      type: DataTypes.STRING,
      validate: { isUrl: true },
    },
    gstNumber: {
      type: DataTypes.STRING,
    },
    panNumber: {
      type: DataTypes.STRING,
      field: "pan_number",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_verified",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "partner_profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      { unique: true, fields: ["user_id"] },
      { fields: ["business_type_id"] },
      { fields: ["is_active"] },
    ],
  },
);

export default PartnerProfile;
