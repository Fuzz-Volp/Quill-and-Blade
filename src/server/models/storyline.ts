import { Schema, model, Types } from "mongoose";
import { IStoryline } from "../../@types/global";

const StorylineSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    chapters: { type: Number, default: 0 },
    completedChapters: { type: Number, default: 0 },
    involvedPlayers: [{ type: Types.ObjectId, ref: "Player" }],
    involvedNPC: [{ type: Types.ObjectId, ref: "NPC", required: true }],
    notes: String,
  },
  {
    timestamps: true,
  }
);

const StoryLine = model<IStoryline>("Storyline", StorylineSchema);

export default StoryLine;
