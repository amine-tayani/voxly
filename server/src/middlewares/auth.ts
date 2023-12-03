import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");

    if (!token)
      return res.status(403).json({
        message: "You need to Log in First",
      });

    const decoded = jwt.verify(token, config.jwt.secret!);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default authMiddleware;
