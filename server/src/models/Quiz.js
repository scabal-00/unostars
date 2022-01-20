import { Schema, model } from "mongoose";

const quizzesSchema = new Schema(
  {
    id: String,
    title: String,
    dsc: String,
    photo: String,
    isActive: Boolean,
    globalTopic: 
    globalTopic: {
      id: String,
      title: String,
      dsc: String,
      topics: [
        {
          id: String,
          title: String,
          dsc: String,
          isActive: Boolean,
          questions: [
            {
              id: Number,
              title: String,
              dsc: String,
              isActive: Boolean,
              isSelected: Boolean,
              isPrivate: Boolean,
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
            },
          ],
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Quizzes", quizzesSchema);
