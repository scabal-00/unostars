import { Schema, model } from "mongoose";

const userQuizSchema = new Schema(
  {
    title: { type: String, required: true },
    dsc: String,
    isActive: { type: Boolean, default: true },
    userId: {
      type: String,
      required: true,
    },
    remitterId: {
      type: String,
    },
    quizId: {
      type: String,
    },
    /* userAnswers: {
      selectedAnswers: [
        {
          questionId: String,
          correctAnswer: String,
          userAnswer: String,
          score: { type: Number, default: 0 },
        },
      ],
      countAnswers: {
        countCorrectAnswers: { type: Number, default: 0 },
        countWrongAnswers: { type: Number, default: 0 },
        totalQuestions: { type: Number, default: 0 },
      },
      totalScore: { type: Number, default: 0 },
    }, */
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("UserQuiz", userQuizSchema);
