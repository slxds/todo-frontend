import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

export const Layout = () => {
  const { logout } = useAuth();
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/profile">Profile Page</Link>
        </li>
      </ul>
      <button onClick={logout}>Logout</button>

      <Outlet />
    </div>
  );
};
