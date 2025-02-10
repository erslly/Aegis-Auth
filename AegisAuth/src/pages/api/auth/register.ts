// src/pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb(); 
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Kullanıcı adı, e-posta ve şifre gereklidir." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Bu e-posta zaten kayıtlı." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const hashedEmail = await bcrypt.hash(email, 10);

    const newUser = new User({ 
      username, 
      email: hashedEmail, 
      password: hashedPassword 
    });
    await newUser.save();

    return res.status(201).json({
      message: "Kullanıcı başarıyla kaydedildi",
      user: { username: newUser.username, email: hashedEmail } 
    });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return res.status(500).json({ error: (error instanceof Error ? error.message : "Bilinmeyen hata") });
  }
};

export default registerHandler;
