import User from "./user.model.js";
import PartnerProfile from "./partner_profile.model.js";
import BusinessType from "./business_type.model.js";
import Activity from "./activity.model.js";
import Category from "./category.model.js";
import ActivityCategoryMapping from "./activity_category_mapping.model.js";
import PartnerActivity from "./partner_activity.model.js";

export {
  User,
  PartnerProfile,
  BusinessType,
  Activity,
  Category,
  ActivityCategoryMapping,
  PartnerActivity,
};

User.hasOne(PartnerProfile, { foreignKey: "userId" });
PartnerProfile.belongsTo(User, { foreignKey: "userId" });

PartnerProfile.hasMany(PartnerActivity, { foreignKey: "partnerProfileId" });
PartnerActivity.belongsTo(PartnerProfile, { foreignKey: "partnerProfileId" });
PartnerProfile.belongsTo(BusinessType, { foreignKey: "businessTypeId" });

Activity.hasMany(ActivityCategoryMapping, { foreignKey: "activityId" });

Category.hasMany(ActivityCategoryMapping, { foreignKey: "categoryId" });

BusinessType.hasMany(PartnerProfile, { foreignKey: "businessTypeId" });

ActivityCategoryMapping.belongsTo(Activity, { foreignKey: "activityId" });
ActivityCategoryMapping.belongsTo(Category, { foreignKey: "categoryId" });
