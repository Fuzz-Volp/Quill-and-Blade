import React, { FC } from "react";
import { IHomeProps } from "../../@types/global";

export const Home: FC<IHomeProps> = (props) => {
  return (
    <div className="min-h-screen">
      <h1>Home Page</h1>
      <h1>Welcome to Quill & Blade</h1>
      <div>
        <h1>Games</h1>
      </div>
      <div>
        <h1>About</h1>
      </div>
      <div>
        <h1>Contact</h1>
      </div>
    </div>
  );
};
