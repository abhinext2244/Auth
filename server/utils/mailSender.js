import nodemailer from "nodemailer";

const mailSender = async (email, subject, body) => {
      try {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASS,
        },
    });
    const mailOptions = {
        from: "Auth",
        to: email,
        subject: subject,
        html: body,
    };
       return await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.log(error);
    }
};

export default mailSender