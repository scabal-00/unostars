import { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    id: Number,
    title: String,
    dsc: String,
    isActive: Boolean,
    private: {
      isPrivate: Boolean,
      clientId: { type: Schema.ObjectId, ref: "User" },
    },
    type: {
      id: String,
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
