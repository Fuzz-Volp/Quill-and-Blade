import { Request, Response, NextFunction } from "express";
import Player from "../../models/player";
import logging from "../../config/logging";

const namespace = "Player Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundPlayers = await Player.find({})
        .populate({ path: "storyline", options: { strictPopulate: false } })
        .exec();
      logging.info(foundPlayers, namespace);
      res.locals.data.players = foundPlayers;
      next();
    } catch (error) {
      res.status(404).json({ message: "Players Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
      logging.info(deletedPlayer, namespace);
      res.locals.data = {};
      res.locals.data.player = deletedPlayer;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the Player" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedPlayer = await Player.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatedPlayer, namespace);
      res.locals.data.player = updatedPlayer;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the Player" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdPlayer = await Player.create(req.body);
      logging.info(createdPlayer, namespace);
      res.locals.data.player = createdPlayer;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating Player" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundPlayer = await Player.findById(req.params.id);
      logging.info(foundPlayer, namespace);
      res.locals.data.player = foundPlayer;
      next();
    } catch (error) {
      res.status(404).json({ message: "Player wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.players);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.player);
  },
};

export { dataController, apiController };
