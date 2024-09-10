import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { FC, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const userToken = Cookies.get("accessToken") || "";
  const location = useLocation();
  const routeUser = location?.pathname?.split("/")[1];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("user");
      navigate("/");
      dispatch(setPath([]));
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const handleLogout = () => {
      if (!userToken && user) {
        mutate(user?.query?.id);
      } else {
        navigate("/auth");
      }
    };
    if (!userToken) {
      handleLogout();
      return;
    } else if (
      UserRole[user?.query?.role].toLowerCase() !== routeUser.toLowerCase()
    ) {
      navigate(-1); // Use useNavigate to go back in the history
      return;
    }
  }, [userToken, routeUser]);

  return <>{children}</>;
};

export default ProtectedRoute;
