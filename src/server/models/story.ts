import { Schema, model, Types } from "mongoose";
import { IStory } from "../../@types/global";

const storySchema: Schema = new Schema(
  {
    header: { type: String },
    subheader: { type: String },
    body: { type: String, required: true },
    check: { type: String },
    encounter: [{ type: Types.ObjectId, ref: "Encounter" }],
  },
  {
    timestamps: true,
  }
);

const Story = model<IStory>("Story", storySchema);

export default Story;
