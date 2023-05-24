import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import { IUser } from "../../@types/global";
import config from "../../config/config";
import logging from "../../config/logging";
import checkToken from "../../middleware/checkToken";

const namespace = "User Controller";

const dataController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.create(req.body);

      const token = createJWT(user);
      res.locals.data.user = user;
      res.locals.data.token = token;
      next();
    } catch (error) {
      res.status(400).json(error);
      logging.error(error, namespace);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      res.locals.data.user = user;
      res.locals.data.token = createJWT(user);
      next();
    } catch (error) {
      res.status(400).json("Bad Credentials");
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  auth(req: Request, res: Response) {
    res.json(res.locals.data.token);
  },
};

export { dataController, apiController, checkToken };

/** Helper function */

function createJWT(user: IUser) {
  return jwt.sign({ user }, config.secret, { expiresIn: "24h" });
}
