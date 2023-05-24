import { Request, Response, NextFunction } from "express";
import { IUser } from "../@types/global";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const ensureLoggedIn = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return res.status(401).json("Unauthorized");
  next();
};

export default ensureLoggedIn;
