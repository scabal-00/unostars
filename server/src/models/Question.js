import { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    dsc: String,
    isActive: { type: Boolean, default: true },
    topicsId: [String],
    private: {
      isPrivate: Boolean,
      usersId: [String],
    },
    questionType: {
      name: String,
      dsc: String,
      options: [
        {
          id: String,
          dsc: String,
          isAnswer: Boolean,
        },
      ],
    },
    difficulty: Number,
    questionScore: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Question", questionSchema);
