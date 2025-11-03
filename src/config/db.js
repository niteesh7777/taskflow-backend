import mongoose from "mongoose";
import { config } from "./env.js";

const MAX_RETRIES = 5;
let retries = 0;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${config.mongoUri}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(
      `MongoDB connection failed reconnecting(${retries}/${MAX_RETRIES})..`
    );

    console.error(error);

    retries += 1;

    if (retries >= MAX_RETRIES) {
      console.error("maximum retries to connecto database exeeded!");
      process.exit(1);
    }
    console.log("⏳ Retrying in 3 seconds...");
    setTimeout(connectDB, 3000);
  }
};

export default connectDB;
