import { Resend } from "resend";

export const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error(" RESEND_API_KEY missing at runtime");
    return null;
  }

  return new Resend(apiKey);
};

const mailSender = async (to, subject, html) => {
  const resend = getResendClient();   //  GET CLIENT HERE

  if (!resend) {
    throw new Error("Email service not configured");
  }

  return resend.emails.send({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
  });
};

export default mailSender;

