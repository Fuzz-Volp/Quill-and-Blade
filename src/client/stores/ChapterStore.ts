import { create } from "zustand";
import axios from "axios";
import { IChapter } from "../../@types/global";
import logging from "../config/logging";
import { ChapterStore } from "../../@types/global";

const namespace = "ChapterStore";

const useChapterStore = create<ChapterStore>((set) => ({
  chapters: [],
  loading: false,
  error: false,

  // Index
  getAllChapters: async () => {
    set(() => ({ loading: true, error: false }));
    try {
      const response = await axios.get("/api/chapter");
      set({ chapters: response.data, loading: false });
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  // Create
  createChapter: async (chapter: IChapter) => {
    set(() => ({ loading: true, error: false }));
    try {
      await axios.post("/api/chapter", chapter);
      set({ loading: false });
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  // Update
  updateChapter: async (id: string, chapter: IChapter) => {
    set(() => ({ loading: true, error: false }));
    try {
      await axios.put(`/api/chapter/${id}`, chapter);
      set({ loading: false });
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  // Delete
  deleteChapter: async (id: string) => {
    set(() => ({ loading: true, error: false }));
    try {
      await axios.delete(`/api/chapter/${id}0`);
      set({ loading: false });
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },
}));

export default useChapterStore;
