const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE URL", import.meta.env.VITE_BASE_URL);

 export const endpoint = {
        SENDOTP_API: `${BASE_URL}/SendOtp`,
        SIGNUP_API: `${BASE_URL}/SignUp`,
        LOGIN_API: `${BASE_URL}/Login`,
        Logout_API: `${BASE_URL}/logout`
 }