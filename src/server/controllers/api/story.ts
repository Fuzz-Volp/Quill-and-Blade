import { Request, Response, NextFunction } from "express";
import Story from "../../models/story";
import logging from "../../config/logging";

const namespace = "Story Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundStories = await Story.find({});
      logging.info(foundStories, namespace);
      res.locals.data.stories = foundStories;
      next();
    } catch (error) {
      res.status(404).json({ message: "Stories Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedStory = await Story.findByIdAndDelete(req.params.id);
      logging.info(deletedStory, namespace);
      res.locals.data = {};
      res.locals.data.story = deletedStory;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the Story" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedStory = await Story.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatedStory, namespace);
      res.locals.data.story = updatedStory;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the Story" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdStory = await Story.create(req.body);
      logging.info(createdStory, namespace);
      res.locals.data.story = createdStory;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating Story" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundStory = await Story.findById(req.params.id);
      logging.info(foundStory, namespace);
      res.locals.data.story = foundStory;
      next();
    } catch (error) {
      res.status(404).json({ message: "Story wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.stories);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.story);
  },
};

export { dataController, apiController };
