import React from "react";
import { Link } from "react-router-dom";
import { INavProps } from "../../../@types/global";

const Nav: React.FC<INavProps> = () => {
  return (
    <div>
      <nav>
        <ul>
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
