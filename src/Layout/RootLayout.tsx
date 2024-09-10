import { UserRole } from "@/types/UserRole";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON?.parse(userData) : null;
  const userToken = Cookies.get('accessToken');

  useEffect(() => {
    if (location.pathname === "/") {
      if (userToken) {
        navigate(`/${UserRole[user?.query?.role]}/dashboard`);
      } else {
        navigate("/auth");
      }
    }
  }, [location]);

  return <Outlet />;
};

export default RootLayout;
