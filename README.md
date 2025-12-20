# BACKEND
# Authentication System
A secure full-stack authentication system built using the MERN stack. This project implements user signup and login with OTP verification, password hashing, JWT-based authentication, and protected routes.
 # Features
- User Signup with OTP verification
- Secure Login & Logout
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Environment variable configuration
- RESTful API architecture
 # Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT, bcrypt
- Tools: Brevo Api, OTP Generator
 # Project Structure
- controllers/
- routes/
- models/
- utils/
- config/
- database/
 # Environment Variables
  - ACCESS_TOKEN_SECRET=your_access_token_secret
  - MONGO_URL=your_mongodb_connection_string
  - RESEND_API_KEY=your_resend_api_key
  - FROM_EMAIL=your_sender_email
  - FROM_NAME=your_app_name

# FRONTEND

 # API Endpoints
- POST /api/auth/send-otp
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/Logout 
 # Live Demo
   https://auth-taupe-phi.vercel.app/
   
 # Learning Outcome
   Understanding of authentication flow
   Secure password handling
   JWT token lifecycle
   Backend and frontend integration

 # Run Project Locally (Using Concurrently)
   This project uses **concurrently** to run both frontend and backend servers at the same time.
 # Prerequisites
  - Node.js (v20 or above)
  - MongoDB (local or MongoDB Atlas)
  - Git
 # Clone the Repository
   git clone https://github.com/abhinext2244/Auth.git
   - cd Auth
 # Install Dependencies
  -npm install
 # Start Frontend & Backend Together
 - npm run dev
 # Open in Browser
 - Frontend: http://localhost:5173
 - Backend API: http://localhost:3007
