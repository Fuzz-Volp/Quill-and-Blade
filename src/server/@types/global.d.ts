import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export interface IChapter extends Document {
  title: string;
  body: string;
  link?: string;
}

export interface IGame extends Document {
  title: string;
}

export interface IDate extends Document {
  date: string;
}
