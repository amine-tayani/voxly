import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User";
import config from "../config/config";
import { generateToken, verifyToken } from "../utils/token";
import Token from "../models/Token";
import { sendResetPasswordEmail } from "../utils/email";

const router = express.Router();

// create new User account
export const createAccount = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res.status(400).json({ msg: "*This email already exists." });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
    });
    const newAccount = await newUser.save();
    const token = jwt.sign({ id: newAccount._id }, config.jwt.secret!, {
      expiresIn: "30d",
    });

    res.status(201).json({
      token,
      user: {
        id: newAccount._id,
        email: newAccount.email,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: `Error (${err.message})`,
      };
    }
  }
};

// login to account middleware

export const loginIntoAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ msg: "No such account has been found." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Email or password is incorrect." });
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: `Error (${err.message})`,
      };
    }
  }
};

// Check if token is valid
export const checkIftokenIsValid = async (req: Request, res: Response) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(500).json("*No access token has been found");
    const verified = verifyToken(token);
    if (!verified) return res.status(500).json("*Access token is not valid");
    // @ts-ignore
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: `Error (${err.message})`,
      };
    }
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error("Email does not exist");

  let randomChars = crypto.randomBytes(32).toString("hex");
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(randomChars, Number(salt));

  const createdToken = new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  });

  const resToken = await createdToken.save();

  sendResetPasswordEmail(user.email, resToken.token);

  res.status(201).json({
    message: "check your mail to reset your password.",
  });
};

export const resetPassword = async (req: Request, res: Response) => {};

export const logout = async (req: Request, res: Response) => {};

export default router;
