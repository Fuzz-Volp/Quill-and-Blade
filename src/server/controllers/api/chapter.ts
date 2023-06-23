import { Request, Response, NextFunction } from "express";
import Chapter from "../../models/chapter";
import logging from "../../config/logging";

const namespace = "Chapter Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundChapters = await Chapter.find({}).populate("Storyline").exec();
      logging.info(foundChapters, namespace);
      res.locals.data.chapters = foundChapters;
      next();
    } catch (error) {
      res.status(404).json({ message: "Chapters Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedChapter = await Chapter.findByIdAndDelete(req.params.id);
      logging.info(deletedChapter, namespace);
      res.locals.data = {};
      res.locals.data.chapter = deletedChapter;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the Chapter" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedChapter = await Chapter.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatedChapter, namespace);
      res.locals.data.chapter = updatedChapter;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the Chapter" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdChapter = await Chapter.create({
        chapter: req.body.chapter,
      });
      logging.info(createdChapter, namespace);
      res.locals.data.chapter = createdChapter;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating Chapter" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundChapter = await Chapter.findById(req.params.id);
      logging.info(foundChapter, namespace);
      res.locals.data.chapter = foundChapter;
      next();
    } catch (error) {
      res.status(404).json({ message: "Chapter wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.chapters);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.chapter);
  },
};

export { dataController, apiController };
