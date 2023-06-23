import { Request, Response, NextFunction } from "express";
import StoryLine from "../../models/storyline";
import logging from "../../config/logging";

const namespace = "StoryLine Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundStoryLines = await StoryLine.find({})
        .populate("Player")
        .populate("NPC")
        .exec();
      logging.info(foundStoryLines, namespace);
      res.locals.data.storyLines = foundStoryLines;
      next();
    } catch (error) {
      res.status(404).json({ message: "StoryLines Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedStoryLine = await StoryLine.findByIdAndDelete(req.params.id);
      logging.info(deletedStoryLine, namespace);
      res.locals.data = {};
      res.locals.data.storyLine = deletedStoryLine;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the StoryLine" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedStoryLine = await StoryLine.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatedStoryLine, namespace);
      res.locals.data.storyLine = updatedStoryLine;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the StoryLine" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdStoryLine = await StoryLine.create({
        storyLine: req.body.storyLine,
      });
      logging.info(createdStoryLine, namespace);
      res.locals.data.storyLine = createdStoryLine;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating StoryLine" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundStoryLine = await StoryLine.findById(req.params.id);
      logging.info(foundStoryLine, namespace);
      res.locals.data.storyLine = foundStoryLine;
      next();
    } catch (error) {
      res.status(404).json({ message: "StoryLine wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.storyLines);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.storyLine);
  },
};

export { dataController, apiController };
