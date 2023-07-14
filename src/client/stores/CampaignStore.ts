import { create } from "zustand";
import axios from "axios";
import { ICampaign } from "../../@types/global";
import logging from "../config/logging";
import { CampaignStore } from "../../@types/global";

const namespace = "CampaignStore";

const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  loading: false,
  error: false,

  // Index
  getAllCampaigns: async () => {
    set(() => ({ loading: true, error: false }));
    try {
      const response = await axios.get("/api/campaign");
      set({ campaigns: response.data, loading: false });
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  // Create
  createCampaign: async (campaign: ICampaign) => {
    set(() => ({ loading: true, error: false }));
    try {
      await axios.post("/api/campaign", campaign);
      // Optionally, you can fetch all campaigns again after creating a new one:
      // await useCampaignStore.getState().getAllCampaigns();
      set({ loading: false });
    } catch (error) {
      logging.error(error, namespace);
      set(() => ({ error: true, loading: false }));
    }
  },

  //Update
  updateCampaign: async (id: string, campaign: ICampaign) => {
    set(() => ({ loading: true, error: false }));
    try {
      await axios.put(`/api/campaign/${id}`, campaign);
      // Optionally, you can fetch all campaigns again after updating:
      // await useCampaignStore.getState().getAllCampaigns();
      set({ loading: false });
    } catch (error) {
      set(() => ({ error: true, loading: false }));
    }
  },

  //Delete
  deleteCampaign: async (id: string) => {
    set(() => ({ loading: true, error: false }));
    try {
      await axios.delete(`/api/campaign/${id}`);
      // Optionally, you can fetch all campaigns again after deleting:
      // await useCampaignStore.getState().getAllCampaigns();
      set({ loading: false });
    } catch (error) {
      set(() => ({ error: true, loading: false }));
    }
  },
}));

export default useCampaignStore;
