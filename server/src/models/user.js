import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userId: { type: String, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Provide a valid email",
      ],
    },
    isActive: { type: Boolean, default: true, required: true },
    age: Number,
    gender: String,
    photo: String,
    role: { type: String, default: "normal", required: true },
    level: {
      userLevel: { type: String, default: "Ponny" },
      professionalLevel: { type: String, default: "Junior" },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
