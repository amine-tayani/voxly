import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });
    const verified = jwt.verify(token, config.jwt.secret!);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    // @ts-ignore
    req.user = verified.id;
    next();
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ error: err.message });
  }
};

export default auth;
