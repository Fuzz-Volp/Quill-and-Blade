import { Schema, model } from "mongoose";
import { IUser } from "../@types/global";
import bcrypt from "bcrypt";
import config from "../config/config";

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, toLowerCase: true, unique: true },
    firstName: String,
    lastName: String,
    password: { type: String, required: true, minLength: 6, trim: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, config.bcrypt.salt);
  return next();
});

export default model<IUser>("User", UserSchema);
