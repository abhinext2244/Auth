import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../api/authApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formState;
    dispatch(LoginApi(email, password, navigate));
  };

  const { email, password } = formState;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-[var(--primary-800)] w-[380px] p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-semibold text-[var(--ash-100)] mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-[var(--ash-100)] mb-5">
              Login to your account
            </p>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--ash-200)] mb-1">
                Email <sup className="text-red-500">*</sup>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input-box"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[var(--ash-200)] mb-1">
                Password <sup className="text-red-500">*</sup>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input-box"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[var(--primary-500)] hover:bg-[var(--primary-600)]
                         text-white py-2 rounded-md font-medium transition"
            >
              Login
            </button>

            {/* Footer */}
            <p className="text-xs text-center text-[var(--ash-300)] mt-4">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-yellow-400 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>

          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
