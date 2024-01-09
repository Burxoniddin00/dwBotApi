import { Schema, model } from "mongoose";

const Bot = new Schema(
  {
    name: {
      type: String,
    },
    singer: {
      type: String,
    },
    music_titel: {
      type: String,
    },
    music_size: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "create_at",
      deletedAt: "deleted_at",
    },
  }
);

export default model("bot", Bot);
