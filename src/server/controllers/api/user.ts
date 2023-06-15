import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import { IUser } from "../../@types/global";
import config from "../../config/config";
import logging from "../../config/logging";

const namespace = "User Controller";

const dataController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.create(req.body);
      logging.info(user, namespace);
      const token = createJWT(user);
      res.locals.data.user = user;
      res.locals.data.token = token;
      next();
    } catch (error) {
      res.status(400).json({ error: "Failed to Register User" });
      logging.error(error, namespace);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        logging.error("found error in email confirmation", namespace);
        throw new Error();
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        logging.error("found error in password confirmation", namespace);
        throw new Error();
      }
      res.locals.data.user = user;
      res.locals.data.token = createJWT(user);
      next();
    } catch (error) {
      res.status(400).json({ error: "Bad Credentials" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  auth(req: Request, res: Response) {
    res.json(res.locals.data.token);
  },
};

function createJWT(user: IUser) {
  return jwt.sign({ user }, config.secret, { expiresIn: "24h" });
}

export { dataController, apiController };
