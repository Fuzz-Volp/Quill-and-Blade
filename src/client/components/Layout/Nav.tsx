import React from "react";
import { Link } from "react-router-dom";
import { INavProps } from "../../../@types/global";

export const Nav: React.FC<INavProps> = () => {
  return (
    <div className="bg-gray-800 text-white py-4">
      <nav className="">
        <ul className="flex flex-row justify-around ">
          <li>
            <Link to={"/"}>🏠</Link>
          </li>
          <li>
            <Link to={"/games"}>🎲</Link>
          </li>
          <li>
            <Link to={"/about"}>📖</Link>
          </li>
          <li>
            <Link to={"/contact"}>📳</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
