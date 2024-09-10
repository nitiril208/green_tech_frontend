import Logo1 from "@/assets/images/logo.png";
import Logo2 from "@/assets/images/logo2.png";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./comman/Button/CustomButton";
import Loading from "./comman/Error/Loading";
import { AlertLogOutDialog } from "./Models/AlertLogOut";
import { toast } from "./ui/use-toast";
import { setPath } from "@/redux/reducer/PathReducer";
import { useAppDispatch } from "@/hooks/use-redux";
import Cookies from "js-cookie";

interface headerProps {
  hasDiffHeader?: boolean;
  isBtnHide?: boolean;
}

function Header(props: headerProps) {
  const navigate = useNavigate();
const dispatch=useAppDispatch();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const path = localStorage?.getItem("path");
  const userData = localStorage?.getItem("user");
  const userToken = Cookies.get('accessToken') || "";

  const { mutate, isPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      Cookies.remove('accessToken');
      localStorage.removeItem("user");
      navigate("/");
      dispatch(setPath([]));
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmLogout = () => {
    const user = JSON.parse(userData as string);
    const userId = user?.query ? user?.query?.id : user?.id;
    mutate(userId);
  };

  const handleGotoDashboard = () => {
    const user = !!userData && JSON.parse(userData)?.query;

    switch (user.role) {
      case "1":
        navigate(`/company/dashboard`);
        break;
      case "2":
        navigate(`/trainer/dashboard`);
        break;
      case "3":
        navigate(`/trainee/dashboard`);
        break;
      case "4":
        navigate(`/employee/dashboard`);
        break;

      default:
        navigate("/");
        break;
    }
  };

  return (
    // Note : This below code is for backup
    <>
      <header
        className={`xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 py-7 ${
          props.hasDiffHeader ? "mx-7" : ""
        }`}
      >
        <div className="flex justify-between gap-4">
          <div className="flex items-end">
            <div className={` ${!props.hasDiffHeader ? "xl:mr-7 mr-2" : ""}`}>
              <img
                onClick={() => {
                  navigate("/");
                }}
                className="cursor-pointer"
                src={Logo1}
              />
            </div>
            <div className="xl:ml-5 ml-3 text-[#1f1313]">
              <ul className="flex gap-[31px] font-normal text-base leading-5 font-calibri mb-3">
                <li className="group flex items-center gap-[5px]">
                  <span className="cursor-pointer">Our Courses</span>
                  <img
                    className="w-[6px] h-[6px]"
                    src="../assets/img/Vector 1.png"
                  />
                </li>
                <li>Blogs</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="flex items-end">
            <div className="font-bold text-lg text-color">
              {userData ? (
                <div className="flex items-center xl:gap-5 gap-3">
                  {userToken &&
                    !!path &&
                    (JSON.parse(path) === "7" || JSON.parse(path) > "4") && (
                      <PrimaryButton
                        onClick={handleGotoDashboard}
                        name="Go to Dashboard"
                        className="xl:px-[30px] px-[15px] py-2 primary-background font-semibold !font-abhaya text-lg"
                      />
                    )}
                  {!props?.isBtnHide && (
                    <PrimaryButton
                      onClick={handleLogout}
                      name="Logout"
                      className="xl:px-[60px] px-[45px] py-2 primary-background font-semibold !font-abhaya text-lg="
                    />
                  )}
                </div>
              ) : (
                <>
                  {!props?.isBtnHide && (
                    <>
                      <PrimaryButton
                        onClick={() => {
                          navigate("/register");
                        }}
                        name="Register"
                        className="xl:px-[39px] px-[30px] py-2 primary-background font-semibold !font-abhaya text-lg"
                      />
                      <PrimaryButton
                        onClick={() => {
                          navigate("/auth");
                        }}
                        name="Login"
                        className="xl:px-[39px] px-[45px] ml-5 py-2 primary-background font-semibold !font-abhaya text-lg"
                      />
                    </>
                  )}
                </>
              )}
            </div>
            <img className="xl:ml-7 ml-2" src={Logo2} />
          </div>
        </div>
        <Loading isLoading={isPending} />
      </header>
      <AlertLogOutDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}

export default Header;
