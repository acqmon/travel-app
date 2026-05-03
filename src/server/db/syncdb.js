import sequelize from "./sequelize.js";
import {
  User,
  PartnerProfile,
  BusinessType,
  Activity,
  Category,
  ActivityCategoryMapping,
  PartnerActivity,
  CustomerPlan,
  PartnerPlan,
} from "../models/index.js";

async function syncDB() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

syncDB();
