import React from 'react'
import {Routes,Route} from "react-router-dom";
import SignUp from "../pages/SignUp";
import VerifyEmail from '../pages/verifyEmail';
import LoginForm from '../components/Auth/LoginForm';
import LogoutButton from '../components/LogoutButton';
import Dashboard from '../pages/Dashboard';
import Home from "../pages/Home";
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/logout" element={<LogoutButton/>}/>
        <Route path="/VerifyEmail" element={<VerifyEmail/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes
