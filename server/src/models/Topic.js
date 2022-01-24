import { Schema, model } from "mongoose";

const topicSchema = new Schema(
  {
    title: { type: String, required: true },
    dsc: String,
    isActive: { type: Boolean, default: true },
    gTopic: {
      type: String,
      required: true,
    },
    /* questionsId: [
      {
        type: String,
        required: true,
      },
    ], */
    difficulty: { type: String, default: "junior" },
    topicScore: { type: Number, default: 0 },
    estimatedTime: { type: Number, default: 0 },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Topic", topicSchema);
