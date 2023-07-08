import React from "react";
import { IFooterProps } from "../../../@types/global";

export const Footer: React.FC<IFooterProps> = (props) => {
  return (
    <div className="bg-gray-800 text-white py-4">
      <h1>Footer</h1>
    </div>
  );
};
