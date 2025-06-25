// Fichero que tiene el modelo del usuario

// Importamos mongoose
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  last_name: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  dni: {
    type: String,
    required: [true, "DNI is required"],
    unique: true,
  },
  birth_date: {
    type: Date,
    required: [true, "Birth Date is required"],
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    required: [true, "Gender is required"],
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["USER_ROLE", "ATHLETE_ROLE", "COACH_ROLE", "CLUB_ROLE", "ADMIN_PTS"],
  },
  created_at: {
    type: Date,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
  },
});

export const UserModel = mongoose.model("User", userSchema);
