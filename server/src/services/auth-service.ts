import Token from "../models/Token";
import bcrypt from "bcryptjs";
import User from "../models/User";
import crypto from "crypto";
import { sendResetPasswordEmail, sendResetSuccessEmail } from "../utils/email";

export const requestPasswordReset = async (email: string) => {
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

  return {
    message: "check your mail to reset your password.",
  };
};

export const resetPassword = async (
  userId: string,
  token: string,
  password: string
) => {
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const salt = await bcrypt.genSalt();

  const hash = await bcrypt.hash(password, salt);

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new Error("user does not exists");
  }
  sendResetSuccessEmail(user?.email);

  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };
};
