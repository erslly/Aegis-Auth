// src/lib/mongodb.ts
import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to DB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB connection error:", error);
    throw new Error("Failed to connect to DB");
  }
};

export default connectDb;
