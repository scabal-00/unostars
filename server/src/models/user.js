import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: Number,
    gender: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Provide a valid email",
      ],
    },
    photo: String,
    role: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    isActive: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
