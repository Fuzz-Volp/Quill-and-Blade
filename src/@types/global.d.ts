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
  chapter: Types.ObjectId[] | IChapter;
  day: string;
  progress: string;
  player: Types.ObjectId[] | IPlayer;
  location: string;
  session: ISession[];
  notes?: string;
  link?: string;

  // custom methods
  calculateSessionsPlayed(): number;
  getSessionDates(): Date[];
}

export interface IChapter extends Document {
  title: string;
  story: Types.ObjectId[] | IStory[];
}

export interface IStory extends Document {
  header?: string;
  subheader?: string;
  body: string;
  check?: string;
  encounter?: Types.ObjectId[] | IEncounter[];
}

export interface IPlayer extends Document {
  name: string;
  level: number;
  storyline: Types.ObjectId[] | IStoryLine[];
  completedSessions: number;
  character?: string;
  notes?: string;
}

export interface IStoryline extends Document {
  title: string;
  body: string;
  chapters: Types.ObjectId[] | IChapter;
  completedChapters: number;
  involvedPlayers: Types.ObjectId[];
  notes?: string;
}

export interface INPC extends Document {
  name: string;
  occupation: string;
  class: string;
  level: number;
  background: string;
  associations?: string;
}

export interface IEncounter extends Document {
  title: string;
  link: string;
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

export interface INavProps {}
