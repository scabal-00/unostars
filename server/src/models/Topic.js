import { Schema, model } from "mongoose";

const topicSchema = new Schema(
  {
    id: String,
    title: String,
    dsc: String,
    isActive: Boolean,
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    difficulty: Number,
    topicScore: Number,
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Topic", topicSchema);
