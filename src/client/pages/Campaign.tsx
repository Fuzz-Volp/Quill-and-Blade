import React, { useEffect } from "react";
import useCampaignStore from "../stores/CampaignStore";

export const Campaign = () => {
  const { campaigns, loading, error, getAllCampaigns } = useCampaignStore();

  useEffect(() => {
    getAllCampaigns();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred while fetching campaigns.</p>;
  }

  return (
    <div>
      <h2>Campaign List</h2>
      {campaigns.map((campaign) => (
        <span key={campaign._id}>
          <div>{campaign.day}</div>
          <div>{campaign.progress}</div>

          <div>{campaign.location}</div>

          <div>{campaign.notes}</div>
        </span>
      ))}
    </div>
  );
};
