import SibApiV3Sdk from "sib-api-v3-sdk";
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.RESEND_API_KEY;

const api = new SibApiV3Sdk.TransactionalEmailsApi();

const mailSender = async (to, subject, html) => {
  try {
    const response = await api.sendTransacEmail({
      sender: {
        email: process.env.FROM_EMAIL,   
        name: process.env.FROM_NAME || "Auth",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("BREVO EMAIL SENT:", response.messageId || response);
    return response;
  } catch (error) {
    console.error(
      "Auth EMAIL ERROR:",
      error.response?.text || error.message
    );
    throw error;
  }
};

export default mailSender;
