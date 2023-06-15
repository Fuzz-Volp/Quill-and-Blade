import { Document, Types } from "mongoose";
import { Type } from "typescript";

/** Server */

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export interface IGame extends Document {
  title: string;
  campaign: Type.ObjectId | ICampaign;
}

export interface ICampaign extends Document {
  chapter: number;
  day: string;
  progress: string;
  story: Types.ObjectId | IStory;
  player: Types.ObjectId;
  location: string;
  session: ISession[];
  notes?: string;
  link?: string;

  // custom methods
  calculateSessionsPlayed(): number;
  getSessionDates(): Date[];
}

export interface IStory extends Document {
  title: string;
  body: string;
}

export interface IPlayer extends Document {
  name: string;
  progress: number;
  storyline: Types.ObjectId[] | IStoryLine;
  completedSessions: number;
  character?: string;
  notes?: string;
}

export interface IStoryline extends Document {
  title: string;
  body: string;
  chapters: number;
  completedChapters: number;
  involvedPlayers: Types.ObjectId[];
  notes?: string;
}

export interface ISession {
  date: Date;
}

/** Client */

export interface CampaignState {
  chapter: number;
  day: string;
  progress: string;
  story: Types.ObjectId;
  player: Types.ObjectId;
  location: string;
  session: ISession[];
  notes?: string;
  link?: string;
  sessionDates: Date[];
  sessionsPlayed: number;

  fetchSessionData: (campaignId: string) => Promise<void>;
}
