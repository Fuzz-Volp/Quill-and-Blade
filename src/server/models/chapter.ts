import { Schema, model, Types } from "mongoose";
import { IChapter } from "../../@types/global";

const chapterSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    story: [{ type: Types.ObjectId, ref: "Story", required: true }],
  },
  {
    timestamps: true,
  }
);

const Chapter = model<IChapter>("Chapter", chapterSchema);
Chapter.populate("story", { path: "story" });

export default Chapter;
