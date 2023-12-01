import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

export const getCurrentUser = async (req: Request, res: Response) => {
  // @ts-ignore
  if (!req.user) {
    return res.status(401).json({ message: "Invalid token" });
  } else {
    // @ts-ignore
    const user = await User.findOne(req.id);
    if (!user) return res.status(401).json({ message: "User does not exist" });
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
      },
    });
  }
};

export default router;
