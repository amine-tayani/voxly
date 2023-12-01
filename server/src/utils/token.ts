import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { Types } from "mongoose";

export const generateToken = (id: Types.ObjectId) => {
  const generatedToken = jwt.sign({ id }, config.jwt.secret!, {
    expiresIn: config.jwt.accessExpirationMinutes,
  });
  return generatedToken;
};

export const verifyToken = (token: string): string | JwtPayload => {
  const verifiedToken = jwt.verify(token, config.jwt.secret!);
  if (!verifiedToken) {
    throw new Error("Error verifying token");
  }
  return verifiedToken;
};
