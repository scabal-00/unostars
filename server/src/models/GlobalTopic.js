import { Schema, model } from "mongoose";

const globalTopicSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    dsc: String,
    isActive: { type: Boolean, default: true },
    // topicsId: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("GlobalTopic", globalTopicSchema);
