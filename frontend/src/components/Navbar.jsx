import { Link } from "react-router-dom";
import { navbarData } from "../data/navbar-data";
import { useSelector } from "react-redux";
import LogoutButton from "../components/LogoutButton";

const Navbar = () => {
  const isAuth = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <nav className="flex justify-center items-center gap-6 p-4 bg-[var(--primary-950)] border-b border-[var(--slate-800)] text-white">
      {navbarData.map((item) => {
        //  protected route
        if (item.protected && !isAuth) return null;

        //  guest only (login / signup)
        if (item.authOnly === "guest" && isAuth) return null;

        //  logged in only (logout)
        if (item.authOnly === "user" && !isAuth){
          return
        }

        return (
          <Link
            key={item.id}
            to={item.path}
            className="hover:text-indigo-400"
          >
            {item.label==="Logout"?<LogoutButton/>:item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
