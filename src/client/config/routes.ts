import { Home, About, Contact, Games } from "../pages";

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
