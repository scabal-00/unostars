import { Schema, model } from "mongoose";

const globalTopicsSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    dsc: String,
    isActive: Boolean,
    topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("GlobalTopics", globalTopicsSchema);
