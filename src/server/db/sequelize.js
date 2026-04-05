import { Sequelize } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";
import path from "path";

import bcrypt from "bcrypt";

const password = "Admin@123";
const hash = await bcrypt.hash(password, 10);
console.log(hash);

dotenv.config({
  path: path.resolve(process.cwd(), "../../../.env.local"),
});

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.DB_DIALECT,
  dialectModule: pg,
});

export default sequelize;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
