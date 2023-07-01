import { Request, Response, NextFunction } from "express";
import Game from "../../models/game";
import logging from "../../config/logging";

const namespace = "Game Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundGames = await Game.find({})
        .populate({ path: "campaign", options: { strictPopulate: false } })
        .exec();
      logging.info(foundGames, namespace);
      res.locals.data.games = foundGames;
      next();
    } catch (error) {
      res.status(404).json({ message: "Games Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedGame = await Game.findByIdAndDelete(req.params.id);
      logging.info(deletedGame, namespace);
      res.locals.data = {};
      res.locals.data.game = deletedGame;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the Game" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedGame = await Game.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatedGame, namespace);
      res.locals.data.game = updatedGame;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the Game" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdGame = await Game.create(req.body);
      logging.info(createdGame, namespace);
      res.locals.data.game = createdGame;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating Game" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundGame = await Game.findById(req.params.id)
        .populate({ path: "campaign", options: { strictPopulate: false } })
        .exec();
      logging.info(foundGame, namespace);
      res.locals.data.game = foundGame;
      next();
    } catch (error) {
      res.status(404).json({ message: "Game wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.games);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.game);
  },
};

export { dataController, apiController };
