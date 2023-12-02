import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.body.user.id);

    if (!user) {
      return res.status(400).json({ message: "You are not logged in" });
    }
    res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } catch (e) {
    res.status(400).json({ message: "An error Occured" });
  }
};

export default router;
