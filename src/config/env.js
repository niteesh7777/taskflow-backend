import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["PORT", "MONGO_URI"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

export const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
};
