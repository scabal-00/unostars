import { Schema, model } from "mongoose";

const userQuizSchema = new Schema(
  {
    isActive: { type: Boolean, default: true },
    userId: {
      type: String,
      required: true,
    },
    quizId: {
      type: String,
      required: true,
    },
    userAnswers: {
      selectedAnswers: [
        {
          questionId: String,
          correctAnswer: [String],
          userAnswer: [String],
          score: { type: Number, default: 0 },
        },
      ],
      countAnswers: {
        countCorrectAnswers: { type: Number, default: 0 },
        countWrongAnswers: { type: Number, default: 0 },
        totalQuestions: { type: Number, default: 0 },
      },
      totalScore: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("UserQuiz", userQuizSchema);
