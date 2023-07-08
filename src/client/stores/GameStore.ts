import { create } from "zustand";
import axios from "axios";
import { GameStore, IGame } from "../../@types/global";
import logging from "../config/logging";

const namespace = "GameStore";
const baseURL = "http://localhost:3001/api/game";

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  loading: false,
  error: false,

  getAllGames: async () => {
    set(() => ({ loading: true, error: false }));
    try {
      const response = await axios.get(`${baseURL}`);
      set({ games: response.data, loading: false });
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  getOneGame: async (id: string) => {
    set(() => ({ loading: true, error: false }));
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      set({ games: [response.data], loading: false });
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  createGame: async (game: IGame) => {
    set(() => ({ loading: true, error: false }));
    try {
      const response = await axios.post(`${baseURL}`, game);
      set((state) => ({
        games: [...state.games, response.data],
        loading: false,
      }));
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  updateGame: async (id: string, game: IGame) => {
    set(() => ({ loading: true, error: false }));
    try {
      await axios.put(`${baseURL}/${id}`, game);
      set((state) => ({
        games: state.games.map((g) => (g._id === id ? { ...g, ...game } : g)),
        loading: false,
      }));
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  deleteGame: async (id: string) => {
    set(() => ({ loading: true, error: false }));
    try {
      await axios.delete(`${baseURL}/${id}`);
      set((state) => ({
        games: state.games.filter((g) => g._id !== id),
        loading: false,
      }));
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },
}));
