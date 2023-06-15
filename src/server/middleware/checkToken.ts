// checkToken.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../../@types/global";
import config from "../config/config";

interface AuthenticatedRequest extends Request {
  user?: IUser | null;
  exp?: Date | null;
}

const checkToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined =
    req.get("Authorization") || (req.query.token && String(req.query.token));
  if (token) {
    token = token.replace("Bearer", "").trim();
    jwt.verify(token, config.secret, function (error, decoded) {
      req.user = error ? null : (decoded as { user: any }).user;
      req.exp = error
        ? null
        : new Date((decoded as { exp: number }).exp * 1000);
    });
    return next();
  } else {
    req.user = null;
    return next();
  }
};

export default checkToken;
