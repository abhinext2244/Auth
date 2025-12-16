import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlices";
import { logoutApi } from "../api/authApi";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();        // backend cookie clear
    } catch (error) {
      console.log("Logout API failed",error);
    } finally {
      dispatch(logout());       // frontend state clear
      navigate("/login");       // redirect
    }
  };

  return (
<button
  onClick={handleLogout}

  className={`
    w-full flex justify-center items-center gap-2 p-4
    bg-[var(--primary-500)] hover:bg-[var(--primary-600)]
    disabled:bg-[var(--primary-400)] disabled:cursor-not-allowed
    text-white py-2 rounded-md font-medium transition
  `}
>
  Logout
</button>
  );
};

export default LogoutButton;
