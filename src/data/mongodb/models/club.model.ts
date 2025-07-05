import mongoose, { Schema } from "mongoose";

const clubSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  description: {
    type: String,
  },
  club_logo: {
    type: String,
    required: [true, "Club logo is required"],
  },
  ac_name: {
    type: String,
    required: [true, "Autonomous Community is required"],
  },
  prov_name: {
    type: String,
    required: [true, "Province is required"],
  },
  city_name: {
    type: String,
    required: [true, "City is required"],
  },
  contact_info: {
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    website: {
      type: String,
    },
    social_media: {
      instagram: String,
      facebook: String,
      youtube: String,
    },
  },
  admin: {
    type: Schema.Types.ObjectId,
    required: [true, "Admin is required"],
    ref: "Users",
  },
  coaches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coaches",
    },
  ],
  athletes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Athletes",
    },
  ],
  membership_price: {
    type: Number,
    required: [true, "Membership price is required"],
  },
  created_at: {
    type: Date,
  },
});

export const ClubModel = mongoose.model("Club", clubSchema);
