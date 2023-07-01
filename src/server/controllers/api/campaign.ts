import { Request, Response, NextFunction } from "express";
import Campaign from "../../models/campaign";
import logging from "../../config/logging";

const namespace = "Campaign Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundCampaigns = await Campaign.find({})
        .populate({
          path: "chapter",
          populate: { path: "story", model: "Story" },
          options: { strictPopulate: false },
        })
        .populate({ path: "player", options: { strictPopulate: false } })
        .exec();
      logging.info(foundCampaigns, namespace);
      res.locals.data.campaigns = foundCampaigns;
      next();
    } catch (error) {
      res.status(404).json({ message: "Campaigns Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
      logging.info(deletedCampaign, namespace);
      res.locals.data = {};
      res.locals.data.campaign = deletedCampaign;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the Campaign" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCampaign = await Campaign.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatedCampaign, namespace);
      res.locals.data.campaign = updatedCampaign;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the Campaign" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdCampaign = await Campaign.create(req.body);
      logging.info(createdCampaign, namespace);
      res.locals.data.campaign = createdCampaign;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating Campaign" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundCampaign = await Campaign.findById(req.params.id)
        .populate({
          path: "chapter",
          populate: { path: "story", model: "Story" },
          options: { strictPopulate: false },
        })
        .populate("player");
      logging.info(foundCampaign, namespace);
      res.locals.data.campaign = foundCampaign;
      next();
    } catch (error) {
      res.status(404).json({ message: "Campaign wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.campaigns);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.campaign);
  },
};

export { dataController, apiController };
