import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY not loaded");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (to, subject, html) => {
  return resend.emails.send({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
  });
};

export default mailSender;
