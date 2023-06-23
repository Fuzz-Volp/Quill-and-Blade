import { Schema, model, Types } from "mongoose";
import { IGame } from "../../@types/global";

const chapterSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    story: { type: Types.ObjectId, ref: "Story", required: true },
  },
  {
    timestamps: true,
  }
);

const Chapter = model<IGame>("Chapter", chapterSchema);

export default Chapter;
