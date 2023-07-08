import { Document, Types } from "mongoose";
import { JSXElementConstructor, ReactNode } from "react";

/** Server */

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export interface IGame {
  _id: string;
  title: string;
  campaign: string;
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
  storyline: Types.ObjectId[] | IStoryline[];
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

// Components
export interface INavProps {}
export interface IFooterProps {}

// Pages
export interface IHomeProps {}
export interface IAboutProps {}
export interface IContactProps {}
export interface IGamesProps {}

// Stores

export interface GameStore {
  games: IGame[];
  loading: boolean;
  error: boolean;
  getAllGames: () => Promise<void>;
  getOneGame: (id: string) => Promise<void>;
  createGame: (game: IGame) => Promise<void>;
  updateGame: (id: string, game: IGame) => Promise<void>;
  deleteGame: (id: string) => Promise<void>;
}

// Config
export interface IRoute {
  name: string;
  path: string;
  element: FC<any>;
  exact: boolean;
}
