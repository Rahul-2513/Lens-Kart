import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    avatar: { type: String, default: "" },
    address: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      street: String,
      area: String,
      city: String,
      pincode: String,
      state: String,
      country: String,
    },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
