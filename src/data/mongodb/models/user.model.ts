// Fichero que tiene el modelo del usuario

// Importamos mongoose
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["USER_ROLE", "ATHLETE_ROLE", "COACH_ROLE", "CLUB_ROLE", "ADMIN_PTS"],
  },
  createdAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
  },
});

export const UserModel = mongoose.model("User", userSchema);
