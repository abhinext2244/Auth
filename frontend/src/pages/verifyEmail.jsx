import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpApi } from "../api/authApi";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const signupData = useSelector((state) => state.auth.signupData);

  useEffect(() => {
    if (!signupData) navigate("/signup");
  }, [signupData, navigate]);

  const handleVerify = (e) => {
    e.preventDefault();
 const { name, email, password } = signupData;

dispatch(SignUpApi(name, email, password, otp, navigate));

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--primary-900)] px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-md bg-[var(--primary-800)] rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-[var(--ash-100)] text-center">
            Verify Your Email
          </h2>

          <p className="text-sm text-[var(--ash-200)] text-center mt-2">
            Enter the 6-digit OTP sent to your email
          </p>

          <form onSubmit={handleVerify} className="mt-6 space-y-6">
            {/* OTP INPUT */}
           <OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  containerStyle="flex justify-between gap-2 lg:gap-3"
  renderInput={(props) => (
    <input
      {...props}
      className="
        !w-[48px] !h-[52px]
        lg:!w-[55px] lg:!h-[55px]

        text-center text-xl font-semibold
        rounded-lg

        bg-[var(--primary-700)]
        text-[var(--ash-50)]

        border border-[var(--primary-600)]

        transition-all duration-200

        focus:outline-none
        focus:border-yellow-400
        focus:ring-2 focus:ring-yellow-400/60

        hover:border-[var(--primary-500)]
      "
    />
  )}
/>


            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg
                         hover:bg-yellow-300 transition-all duration-200"
            >
              Verify Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
