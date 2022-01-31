import { Schema, model } from "mongoose";

const globalTopicSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    dsc: String,
    photo: String,
    isActive: { type: Boolean, default: true },
    // topicsId: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = model("GlobalTopic", globalTopicSchema);
