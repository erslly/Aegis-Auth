// src/pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb(); 
  
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Geçersiz kimlik bilgileri" });
      }

      // Şifre doğrulaması
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Geçersiz kimlik bilgileri" });
      }

      // JWT oluştur
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

      return res.status(200).json({ message: "Giriş başarılı", token, user });
    } catch (error) {
      return res.status(500).json({ error: "Giriş sırasında hata oluştu" });
    }
  } 
  
  else if (req.method === "GET") {
    try {
      const users = await User.find({}, { password: 0 }); 
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Verileri çekerken hata oluştu" });
    }
  } 
  
  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default loginHandler;
