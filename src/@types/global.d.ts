import { Document, Types } from "mongoose";
import { JSXElementConstructor, ReactNode } from "react";

/** Server */

export interface IUser extends Document {
  _id: string;
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
  _id: string;
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

export interface IChapter {
  _id: string;
  title: string;
  story: Types.ObjectId[] | IStory[];
}

export interface IStory extends Document {
  _id: string;
  header?: string;
  subheader?: string;
  body: string;
  check?: string;
  encounter?: Types.ObjectId[] | IEncounter[];
}

export interface IPlayer extends Document {
  _id: string;
  name: string;
  level: number;
  storyline: Types.ObjectId[] | IStoryline[];
  completedSessions: number;
  character?: string;
  notes?: string;
}

export interface IStoryline extends Document {
  _id: string;
  title: string;
  body: string;
  chapters: Types.ObjectId[] | IChapter;
  completedChapters: number;
  involvedPlayers: Types.ObjectId[];
  notes?: string;
}

export interface INPC extends Document {
  _id: string;
  name: string;
  occupation: string;
  class: string;
  level: number;
  background: string;
  associations?: string;
}

export interface IEncounter extends Document {
  _id: string;
  title: string;
  link: string;
}

export interface ISession {
  _id: string;
  date: Date;
}

/** Client */

export interface CampaignState {
  _id: string;
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
export interface IChapterFormProps {}

// Pages
export interface IHomeProps {}
export interface IAboutProps {}
export interface IContactProps {}
export interface IGamesProps {}
export interface ITOCProps {}
export interface IChapterProps {}

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

export interface CampaignStore {
  campaigns: ICampaign[];
  loading: boolean;
  error: boolean;
  getAllCampaigns: () => Promise<void>;
  createCampaign: (campaign: ICampaign) => Promise<void>;
  updateCampaign: (id: string, campaign: ICampaign) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
}
export interface ChapterStore {
  chapters: IChapter[];
  loading: boolean;
  error: boolean;
  getAllChapters: () => Promise<void>;
  createChapter: (chapter: IChapter) => Promise<void>;
  updateChapter: (id: string, chapter: IChapter) => Promise<void>;
  deleteChapter: (id: string) => Promise<void>;
}

// Config
export interface IRoute {
  name: string;
  path: string;
  element: FC<any>;
  exact: boolean;
}
