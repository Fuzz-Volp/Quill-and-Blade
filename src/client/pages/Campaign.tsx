import React, { useEffect } from "react";
import useCampaignStore from "../stores/CampaignStore";

const CampaignList = () => {
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
        <div key={campaign._id}>
          
          {/* Render other campaign details */}
        </div>
      ))}
    </div>
  );
};
