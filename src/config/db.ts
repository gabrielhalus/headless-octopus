import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const checkEnvVariables = () => {
  const requiredEnvVariables = ["MONGODB_URI"];

  for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
      console.error(`Error: ${variable} is not set in the .env file.`);
      process.exit(1); // Exit the process with an error code
    }
  }
};

const connectDB = async () => {
  try {
    checkEnvVariables(); // Check required environment variables

    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB successfully 🚀");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with an error code
  }
};

export default connectDB;
