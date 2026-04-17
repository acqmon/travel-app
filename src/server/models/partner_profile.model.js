import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import { PARTNER_STATUS } from "../../constants/status.constant.js";

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
    status: {
      type: DataTypes.ENUM(
        PARTNER_STATUS.PENDING,
        PARTNER_STATUS.APPROVED,
        PARTNER_STATUS.REJECTED,
      ),
      allowNull: true,
      defaultValue: PARTNER_STATUS.PENDING,
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

    addressLine1: {
      type: DataTypes.STRING,
      field: "address_line_1",
    },
    addressLine2: {
      type: DataTypes.STRING,
      field: "address_line_2",
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    zipCode: {
      type: DataTypes.STRING,
      field: "zip_code",
    },
    // isVerified: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    //   field: "is_verified",
    // },
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
