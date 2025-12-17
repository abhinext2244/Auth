const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE URL", BASE_URL);

export const endpoint = {
  SENDOTP_API: `${BASE_URL}/send-otp`,
  SIGNUP_API: `${BASE_URL}/signup`,
  LOGIN_API: `${BASE_URL}/login`,
  LOGOUT_API: `${BASE_URL}/logout`,
};
