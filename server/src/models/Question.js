import { Schema, model } from "mongoose";

/* const privateQuestion = new Schema({
  isPrivate: { type: Boolean, default: false },
  UserId: [String],
});

const questionOptions = new Schema({
  id: String,
  dsc: String,
  isAnswer: Boolean,
});

const questionType = new Schema({
  name: String,
  dsc: String,
  options: [questionOptions],
});  */

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    dsc: String,
    isActive: { type: Boolean, default: true },
    topic: String,
    privateQuestion: {
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
