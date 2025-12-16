import { apiConnector } from "./apiConnector.js";
import { endpoint } from "./api.js";
import toast from "react-hot-toast";
import { setLoading,setAccessToken } from "../redux/slices/authSlices";
const { SENDOTP_API, SIGNUP_API, LOGIN_API } = endpoint;
export function sendOtpApi(email, navigate) {
  return async (dispatch) => {
    const toasId=toast.loading("Sending OTP...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("Sending API RESPONSE..........", response);
      console.log(response.data.success);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP sent successfully");
      navigate("/VerifyEmail");
    } catch (error) {
      console.log("Error while sending otp", error);
      toast.error("Could not send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toasId);
  };
}
export function SignUpApi(name,email,password,otp,navigate){
     return async(dispatch)=>{
        const toastId=toast.loading("Signing Up...");
        dispatch(setLoading(true));
        try {
             const response=await apiConnector("POST",SIGNUP_API,{name,email,password,otp});
             console.log("Sign Up Response..........",response);
           
             if(!response.data.success){
                 throw new Error(response.data.message);
             }
               toast.success("Signed Up Successfully");
             navigate("/login");
        } catch (error) {
            console.log("Error while signing up............",error);
            toast.error("Could not sign up");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
     }
}
export function LoginApi(email,password,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Logging In...");
          dispatch(setLoading(true));
          try {
            const response=await apiConnector("POST",LOGIN_API,{email,password});
            console.log("Login Response..........",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
             dispatch(setAccessToken(response.data.accessToken));
            toast.success("Logged In Successfully");
            navigate("/");
          } catch (error) {
            console.log("Error while signing up............",error);
            toast.error("Could not sign up");
            navigate("/login");
          }
          toast.dismiss(toastId);
          dispatch(setLoading(false));
    }
}
export function logoutApi(){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    const toastId=toast.loading("Logging Out...");
    try {
      const response=await apiConnector("GET","/logout");
      console.log("Logout Response..........",response);
      if(!response.data.success){
          throw new Error(response.data.message);
      }
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.log("Error while signing up............",error);
      toast.error("Could not sign up");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}