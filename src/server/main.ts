import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import logging from "./config/logging";
import config from "./config/config";
import { connectDB } from "./config/db";
import checkToken from "./middleware/checkToken";
import ensureLoggedIn from "./middleware/ensureLoggedIn";
import bodyParser from "body-parser";
import user from "./routes/api/user";
import campaign from "./routes/api/campaign";
import chapter from "./routes/api/chapter";
import game from "./routes/api/game";
import npc from "./routes/api/npc";
import player from "./routes/api/player";
import story from "./routes/api/story";
import storyline from "./routes/api/storyline";
import encounter from "./routes/api/encounter";

const app = express();

connectDB();

/** Config */

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.data = {};
  next();
});

// Check Token
app.use(checkToken);

/** Routes */
app.use("/api/users", user);
app.use("/api/campaign", campaign);
app.use("/api/chapter", chapter);
app.use("/api/game", game);
app.use("/api/npc", npc);
app.use("/api/player", player);
app.use("/api/story", story);
app.use("/api/storyline", storyline);
app.use("/api/encounter", encounter);

// API Route
app.get("/api", (_, res) => {
  res.json({ message: "The API is alive!!" });
});

ViteExpress.listen(app, 3001, () =>
  logging.info(
    `Server is running at ${config.server.host}:${config.server.port} ...`
  )
);
