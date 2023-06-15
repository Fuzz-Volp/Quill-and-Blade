import { Schema, model, Types } from "mongoose";
import { IGame } from "../../@types/global";

const gameSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    campaign: { type: Types.ObjectId, ref: "Campaign" },
  },
  {
    timestamps: true,
  }
);

const Game = model<IGame>("Game", gameSchema);

export default Game;
