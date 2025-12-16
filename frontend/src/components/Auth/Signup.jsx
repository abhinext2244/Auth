import React from 'react'
import { useState } from 'react'
import { setSignupData } from '../../redux/slices/authSlices'
import { sendOtpApi } from '../../api/authApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [formState,setformState]=useState({
        name:"",
        email:"",
        password:""
    })
     const handleChange=(e)=>{
        setformState(
            {...formState,
                [e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
        const signUpData={
        ...formState    
    }
    dispatch(setSignupData(signUpData))
    dispatch(sendOtpApi(formState.email,navigate))
    }
    const {name,email,password}=formState
  return (
    <>
      <form onSubmit={handleSubmit}>
  <div className="min-h-screen flex items-center justify-center">
    
    <div className="bg-[var(--primary-800)]   w-[380px] p-6 rounded-xl shadow-lg">
      
      <h2 className="text-2xl font-semibold text-[var(--ash-100)] mb-1">
        Create Account
      </h2>
      <p className="text-sm text-[var(--ash-100)] mb-5">
        Please fill in the details below
      </p>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--ash-200)] mb-1">
          Name <sup className="text-red-500">*</sup>
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name"
         className="input-box"
        />
      </div>

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
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[var(--primary-500)] hover:bg-[var(--primary-600)]
                   text-white py-2 rounded-md font-medium transition"
      >
        Sign Up
      </button>

    </div>
  </div>
</form>

    </>
  )
}

export default Signup
