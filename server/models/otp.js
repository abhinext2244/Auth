import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import otpTemplate from "../template/mail/EmailVerifactionTemplate.js";
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 300,
  },
});

async function sendEmail(email, otp) {
  try {
    const subject = "OTP Verification";
    const body = otpTemplate(otp);
   const mailresponse = await mailSender(email, subject, body);
   console.log("Email sent successfully", mailresponse.response);
  } catch (error) {
    console.log("Error Occured while sending email ", error.message);
  }
}
otpSchema.pre("save", async function () {
    if(this.isNew){
        await sendEmail(this.email, this.otp);
    };
 
});
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
