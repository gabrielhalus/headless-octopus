import express from "express";

import connectDB from "./config/db";
import routes from "./routes";
import logRequest from "./middlewares/logger";

const main = async () => {
  const app = express();

  // Connect to MongoDB
  await connectDB();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logRequest);

  // Routes
  app.use(routes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => console.log(`Server is now listening on port ${PORT} 🌐`));
};

main().catch((error) => console.error("Error during application startup:" + error.message));
