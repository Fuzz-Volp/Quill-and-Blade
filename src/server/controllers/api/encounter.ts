import { Request, Response, NextFunction } from "express";
import Encounter from "../../models/encounter";
import logging from "../../config/logging";

const namespace = "Encounter Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundEncounters = await Encounter.find({});
      logging.info(foundEncounters, namespace);
      res.locals.data.encounters = foundEncounters;
      next();
    } catch (error) {
      res.status(404).json({ message: "Encounters Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedEncounter = await Encounter.findByIdAndDelete(req.params.id);
      logging.info(deletedEncounter, namespace);
      res.locals.data = {};
      res.locals.data.encounter = deletedEncounter;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the Encounter" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedEncounter = await Encounter.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatedEncounter, namespace);
      res.locals.data.encounter = updatedEncounter;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the Encounter" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdEncounter = await Encounter.create(req.body);
      logging.info(createdEncounter, namespace);
      res.locals.data.encounter = createdEncounter;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating Encounter" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundEncounter = await Encounter.findById(req.params.id);
      logging.info(foundEncounter, namespace);
      res.locals.data.encounter = foundEncounter;
      next();
    } catch (error) {
      res.status(404).json({ message: "Encounter wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.encounters);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.encounter);
  },
};

export { dataController, apiController };
