import { Home, About, Contact, Games, Campaign, TOfC, Chapter } from "../pages";

import { IRoute } from "../../@types/global";

const routes: IRoute[] = [
  {
    name: "home",
    path: "/",
    element: Home,
    exact: true,
  },
  {
    name: "games",
    path: "/games",
    element: Games,
    exact: true,
  },
  {
    name: "tofc",
    path: "/tofc",
    element: TOfC,
    exact: true,
  },
  {
    name: "chapter",
    path: "/chapter",
    element: Chapter,
    exact: true,
  },
  {
    name: "campaign",
    path: "/campaign",
    element: Campaign,
    exact: true,
  },
  {
    name: "about",
    path: "/about",
    element: About,
    exact: true,
  },
  {
    name: "contact",
    path: "/contact",
    element: Contact,
    exact: true,
  },
];

export default routes;
