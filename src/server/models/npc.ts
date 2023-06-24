import { Schema, model, Types } from "mongoose";
import { INPC } from "../../@types/global";

const npcSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, default: 1 },
    background: { type: String, required: true },
    associations: [String],
  },
  {
    timestamps: true,
  }
);

const NPC = model<INPC>("NPC", npcSchema);
export default NPC;

/**
 * name: string;
  occupation: string;
  class: string;
  level: number;
  background: string;
  associations?: string;
 */
