import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import User from "../../models/User";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });

    res.status(200).json({ totalUsers, activeUsers });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
