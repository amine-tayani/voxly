import nodemailer from "nodemailer";
import config from "../config/config";

export interface Message {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}
const transporter = nodemailer.createTransport(config.email);

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<void> => {
  const msg: Message = {
    from: config.email.from!,
    to,
    subject,
    text,
    html,
  };
  await transporter.sendMail(msg);
};

export const sendResetPasswordEmail = async (
  to: string,
  token: string
): Promise<void> => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://${config.clientUrl}/reset-password?token=${token}`;
  const text = `Hi,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Dear user,</strong></h4>
  <p>To reset your password, click on this link: ${resetPasswordUrl}</p>
  <p>If you did not request any password resets, please ignore this email.</p>
  <p>Thanks,</p>
  <p><strong>Team</strong></p></div>`;
  await sendEmail(to, subject, text, html);
};
