import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error while connecting with the database:", error.message);
  }
};

export default DBConnection;
