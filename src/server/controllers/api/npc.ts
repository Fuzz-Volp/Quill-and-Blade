import { Request, Response, NextFunction } from "express";
import NPC from "../../models/npc";
import logging from "../../config/logging";

const namespace = "NPC Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundNPCs = await NPC.find({}).populate("Storyline").exec();
      logging.info(foundNPCs, namespace);
      res.locals.data.npcs = foundNPCs;
      next();
    } catch (error) {
      res.status(404).json({ message: "NPCs Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedNPC = await NPC.findByIdAndDelete(req.params.id);
      logging.info(deletedNPC, namespace);
      res.locals.data = {};
      res.locals.data.npc = deletedNPC;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the NPC" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedNPC = await NPC.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      logging.info(updatedNPC, namespace);
      res.locals.data.npc = updatedNPC;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the NPC" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdNPC = await NPC.create({ npc: req.body.npc });
      logging.info(createdNPC, namespace);
      res.locals.data.npc = createdNPC;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating NPC" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundNPC = await NPC.findById(req.params.id);
      logging.info(foundNPC, namespace);
      res.locals.data.npc = foundNPC;
      next();
    } catch (error) {
      res.status(404).json({ message: "NPC wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.npcs);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.npc);
  },
};

export { dataController, apiController };
