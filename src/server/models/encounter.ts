import { Schema, model } from "mongoose";
import { IEncounter } from "../../@types/global";

const encounterSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Encounter = model<IEncounter>("Encounter", encounterSchema);

export default Encounter;
