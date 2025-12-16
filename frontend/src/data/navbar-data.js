export const navbarData = [
  {
    id: 1,
    label: "Home",
    path: "/",
    protected: false,
  },
   
  {
    id: 3,
    label: "Dashboard",
    path: "/dashboard",
    protected: true,
  },
  {
    id: 4,
    label: "Login",
    path: "/login",
    authOnly: "guest", 
  },
  {
    id: 5,
    label: "Signup",
    path: "/signup",
    authOnly: "guest", 
  },
  {
    id: 6,
    label: "Logout",
    path: "/logout",
    authOnly: "user", 
  },
  
];
