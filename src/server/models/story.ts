import { Schema, model } from "mongoose";
import { IStory } from "../../@types/global";

const storySchema: Schema = new Schema(
  {
    header: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Story = model<IStory>("Story", storySchema);

export default Story;
