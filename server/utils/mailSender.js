import { Resend } from "resend";



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
