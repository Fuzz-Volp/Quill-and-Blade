import { Schema, model, Types } from "mongoose";
import { ICampaign } from "../../@types/global";
import { ISession } from "../../@types/global";

const campaignSchema: Schema = new Schema(
  {
    chapter: { type: Types.ObjectId, ref: "Chapter", required: true },
    day: { type: String, required: true },
    progress: { type: String, required: true },
    player: { type: Types.ObjectId, ref: "Player", required: true },
    location: { type: String, required: true },
    session: [{ date: { type: Date, required: true } }],
    notes: String,
  },
  {
    timestamps: true,
  }
);

campaignSchema.methods.calculateSessionsPlayed = function (): number {
  return this.sessions.length;
};

campaignSchema.methods.getSessionDates = function (): Date[] {
  return this.sessions.map((session: ISession) => session.date);
};

const Campaign = model<ICampaign>("Campaign", campaignSchema);

export default Campaign;
