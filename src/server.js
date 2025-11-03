import app from "./app.js";
import connectDB from "./config/db.js";
import { config } from "./config/env.js";

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`server is running on the PORT: ${config.port}`);
  });
};

startServer();
