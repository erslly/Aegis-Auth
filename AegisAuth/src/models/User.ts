// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
