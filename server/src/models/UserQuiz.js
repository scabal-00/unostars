import { Schema, model } from "mongoose";

const userQuizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dsc: String,
    isActive: {
      type: Boolean,
      required: true,
    },
    userId: { type: Schema.ObjectId, ref: "User" },
    remitterId: { type: Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("UserQuiz", userQuizSchema);
