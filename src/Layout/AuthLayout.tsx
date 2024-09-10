import { UserRole } from "@/types/UserRole";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userToken = Cookies.get("accessToken") || "";

  console.log(
    "UserRole[+user?.query?.role]",
    UserRole[+user?.query?.role]?.toLowerCase()
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  console.log("+++++++++++++++++", UserRole[+user?.query?.role]);

  useEffect(() => {
    if (userToken) {
      navigate(`/${UserRole[+user?.query?.role]?.toLowerCase()}/dashboard`);
    }
    //   else if (location.pathname !== "/resetpassword") {
    //     navigate("/auth");
    //   }
  }, [userToken, navigate, user?.query?.role]);

  return <div>{children}</div>;
};

export default AuthLayout;
