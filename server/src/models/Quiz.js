import { Schema, model } from "mongoose";

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    dsc: String,
    isActive: { type: Boolean, default: true },
    photo: String,
    gTopic: {
      type: String,
    },
    topics: [
      {
        topicId: {
          type: String,
        },
        selectedQuestionsId: [String],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Quiz", quizSchema);
