import User from "./user.model.js";
import PartnerProfile from "./partner_profile.model.js";
import BusinessType from "./business_type.model.js";
import Activity from "./activity.model.js";
import Category from "./category.model.js";
import ActivityCategoryMapping from "./activity_category_mapping.model.js";
import PartnerActivity from "./partner_activity.model.js";
import CustomerPlan from "./customer_plan.model.js";
import PartnerPlan from "./partner_plan.model.js";

// User-PartnerProfile
User.hasOne(PartnerProfile, { foreignKey: "userId" });
PartnerProfile.belongsTo(User, { foreignKey: "userId" });

// BusinessType-PartnerProfile
BusinessType.hasMany(PartnerProfile, { foreignKey: "businessTypeId" });
PartnerProfile.belongsTo(BusinessType, { foreignKey: "businessTypeId" });

// Activity-Category (Many-to-Many)
Activity.belongsToMany(Category, {
  through: ActivityCategoryMapping,
  foreignKey: "activityId",
});
Category.belongsToMany(Activity, {
  through: ActivityCategoryMapping,
  foreignKey: "categoryId",
});
ActivityCategoryMapping.belongsTo(Activity, { foreignKey: "activityId" });
ActivityCategoryMapping.belongsTo(Category, { foreignKey: "categoryId" });

// PartnerProfile-Activity (Many-to-Many via PartnerActivity)
PartnerProfile.belongsToMany(Activity, {
  through: PartnerActivity,
  foreignKey: "partnerProfileId",
});
Activity.belongsToMany(PartnerProfile, {
  through: PartnerActivity,
  foreignKey: "activityId",
});
PartnerActivity.belongsTo(PartnerProfile, { foreignKey: "partnerProfileId" });
PartnerActivity.belongsTo(Activity, { foreignKey: "activityId" });
PartnerProfile.hasMany(PartnerActivity, { foreignKey: "partnerProfileId" });
Activity.hasMany(PartnerActivity, { foreignKey: "activityId" });

export {
  User,
  PartnerProfile,
  BusinessType,
  Activity,
  Category,
  ActivityCategoryMapping,
  PartnerActivity,
  CustomerPlan,
  PartnerPlan,
};
