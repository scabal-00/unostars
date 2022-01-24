import { Schema, model } from "mongoose";

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    dsc: String,
    isActive: { type: Boolean, default: true },
    photo: String,
    gTopic: {
      type: String,
      required: true,
    },
    selectedTopics: [
      {
        topicId: {
          type: String,
          default: "",
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
