import main_logo from "@/assets/images/logo.png";
import SideHeaderLogo from "@/assets/images/logo2.png";
import { RegisterContext } from "@/context/RegisterContext";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Menu } from "lucide-react";
import { useContext, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../comman/Button/CustomButton";
import Loading from "../comman/Error/Loading";
import { AlertLogOutDialog } from "../Models/AlertLogOut";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface headerProps {
  hasDiffHeader?: boolean;
  type?: string | null;
}

function HomeHeader(props: headerProps) {
  const [open, setOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedRole, setShowRegistrationForm } =
    useContext(RegisterContext);

  const userData = localStorage?.getItem("user");
  const userToken = Cookies.get("accessToken") || "";
  const path = JSON.parse(localStorage?.getItem("path") as string);
  const dispatch = useAppDispatch();

  console.log("userToken", userToken, userData);

  const { mutate, isPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("path");
      navigate("/");
      dispatch(setPath([]));
      setIsAlertOpen(false);
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

    switch (+user.role) {
      case 1:
        navigate(`/company/dashboard`);
        break;
      case 2:
        navigate(`/trainer/dashboard`);
        break;
      case 3:
        navigate(`/trainee/dashboard`);
        break;
      case 4:
        navigate(`/employee/dashboard`);
        break;

      default:
        navigate("/");
        break;
    }
  };

  const handleClickRegister = () => {
    navigate("/register");
    setShowRegistrationForm(false);
    setSelectedRole(null);
  };

  return (
    <div
      className="shadow-[0_-13px_50px_-15px_rgba(0,0,0,0.3)] bg-[#fff]"
      style={{}}
    >
      <div className="sticky top-0 h-full z-[50] lg:shadow-none shadow-md bg-white">
        <header
          className={`xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-[20px] md:pt-[42px] pt-[18px] pb-[18px] ${
            props.hasDiffHeader ? "mx-7" : ""
          }`}
        >
          <div className="lg:block hidden">
            <div className="flex justify-between gap-4">
              <div className="flex items-center">
                <div className={` ${!props.hasDiffHeader ? "mr-2" : ""}`}>
                  <img
                    onClick={() => {
                      navigate("/");
                    }}
                    className="cursor-pointer xl:w-[131px] w-[108px]"
                    src={main_logo}
                  />
                </div>
                <div className={` ${!props.hasDiffHeader ? "mr-2" : ""}`}>
                  <img
                    onClick={() => {
                      navigate("/");
                    }}
                    className="cursor-pointer xl:w-[131px] w-[108px]"
                    src={SideHeaderLogo}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="flex gap-[22px]">
                  <Link
                    to={`/`}
                    className="cursor-pointer text-[#63953B] text-[48px] font-abhaya font-bold"
                  >
                    G O I N G
                  </Link>
                  <Link
                    to={`/`}
                    className="cursor-pointer text-[#376513] text-[48px] font-abhaya font-bold"
                  >
                    G R E E N
                  </Link>
                </div>
                <div className="text-[#1f1313]">
                  <ul className="flex font-normal justify-center text-base leading-5 font-calibri mb-4">
                    <li className="group flex items-center gap-[5px]">
                      <Link
                        to={`/our-courses`}
                        className={`pr-[44px] cursor-pointer ${
                          location.pathname === "/our-courses" && "font-[600]"
                        }`}
                      >
                        Our Courses
                      </Link>
                      {/* <img className="w-[6px] h-[6px]" src={vector} /> */}
                    </li>
                    <li className="cursor-pointer">
                      <Link
                        to={`/blog`}
                        className={`pr-[33px] cursor-pointer ${
                          location.pathname === "/blog" && "font-[600]"
                        }`}
                      >
                        Blogs
                      </Link>
                    </li>
                    <li className="cursor-pointer">
                      <Link
                        to={`/contact`}
                        className={`cursor-pointer ${
                          location.pathname === "/contact" && "font-[600]"
                        }`}
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center xl:gap-7 gap-2">
                <div className="font-bold text-lg text-color">
                  {userData ? (
                    <div className="flex items-center xl:gap-5 gap-3">
                      {+JSON.parse(userData)?.query.role === 1 &&
                        !!path &&
                        (+path === 7 || +path > 3) && (
                          <PrimaryButton
                            onClick={handleGotoDashboard}
                            name="Go to Dashboard"
                            className="xl:px-[30px] px-[15px] py-2 primary-background text-lg !font-abhaya font-semibold"
                          />
                        )}
                      {+JSON.parse(userData)?.query.role !== 1 && (
                        <PrimaryButton
                          onClick={handleGotoDashboard}
                          name="Go to Dashboard"
                          className="xl:px-[30px] px-[15px] py-2 primary-background text-lg !font-abhaya font-semibold"
                        />
                      )}
                      <PrimaryButton
                        onClick={handleLogout}
                        name="Logout"
                        className="xl:px-[60px] px-[45px] py-2 primary-background text-lg !font-abhaya font-semibold"
                      />
                    </div>
                  ) : (
                    props?.type !== "trainee" && (
                      <>
                        <PrimaryButton
                          onClick={handleClickRegister}
                          name="Register"
                          className="xl:px-[39px] px-[30px] py-2 primary-background text-lg !font-abhaya font-semibold w-[140px]"
                        />
                        <PrimaryButton
                          onClick={() => {
                            navigate("/auth");
                          }}
                          name="Login"
                          className="xl:px-[39px] px-[45px] ml-5 py-2 primary-background text-lg !font-abhaya font-semibold w-[140px]"
                        />
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden block">
            <div className="flex justify-between items-center relative">
              <div className="flex items-center">
                <div
                  className={` ${
                    !props.hasDiffHeader ? "xl:mr-[22px] mr-2" : ""
                  }`}
                >
                  <img
                    onClick={() => {
                      navigate("/");
                    }}
                    className="cursor-pointer w-[108px] h-[71px]"
                    src={main_logo}
                  />
                </div>
                <img className=" xl:w-[136px] w-[108px]" src={SideHeaderLogo} />
              </div>
              <div className="flex flex-col justify-end going_green_logo">
                <div className="flex gap-[22px]">
                  <Link
                    to={`/`}
                    className="cursor-pointer text-[#63953B] text-[48px] font-abhaya font-bold"
                  >
                    G O I N G
                  </Link>
                  <Link
                    to={`/`}
                    className="cursor-pointer text-[#376513] text-[48px] font-abhaya font-bold"
                  >
                    G R E E N
                  </Link>
                </div>
              </div>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <div className="">
                  <Button
                    onClick={() => setOpen(!open)}
                    type="button"
                    className="bg-transparent text-black p-0"
                  >
                    <Menu />
                  </Button>
                  <div
                    className={`z-50 absolute bg-white w-full min-h-[269px] h-full ${
                      open
                        ? "bottom-[-310px] visible opacity-100"
                        : "bottom-[-350px] invisible opacity-0"
                    }  duration-500 ease-in-out right-0 rounded-xl`}
                  >
                    <div className="px-7 py-5 flex items-center justify-between flex-col w-full h-full">
                      <ul className="flex flex-col gap-2 mb-[14px] w-full">
                        <li className="group flex items-center justify-between border-b border-[#B9B9B9] pb-2">
                          <Link to={`/our-courses`} className="cursor-pointer">
                            Our Courses
                          </Link>
                        </li>
                        <li className="group flex items-center justify-between border-b border-[#B9B9B9] pb-2">
                          <Link to={`/blog`} className="cursor-pointer">
                            Blogs
                          </Link>
                        </li>
                        <li className="group flex items-center justify-between border-b border-[#B9B9B9] pb-2">
                          <Link to={`/contact`} className="cursor-pointer">
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                      <div className="flex flex-col gap-3 w-full">
                        <div className="font-bold text-lg text-color">
                          {userData ? (
                            <div className="flex sm:flex-row flex-col items-center xl:gap-5 gap-3">
                              {!!path && (+path === 7 || +path > 3) && (
                                <PrimaryButton
                                  onClick={handleGotoDashboard}
                                  name="Go to Dashboard"
                                  className="xl:px-[30px] px-[15px] py-2 primary-background !font-calibri text-lg font-bold sm:w-auto w-full"
                                />
                              )}
                              <PrimaryButton
                                onClick={handleLogout}
                                name="Logout"
                                className="py-2 primary-background !font-calibri text-lg font-bold sm:w-auto w-full"
                              />
                            </div>
                          ) : (
                            props?.type !== "trainee" && (
                              <div className="flex sm:flex-row flex-col items-center xl:gap-5 gap-3">
                                <PrimaryButton
                                  onClick={handleClickRegister}
                                  name="Register"
                                  className="py-2 primary-background !font-calibri text-lg font-bold sm:w-[139px] w-full"
                                />
                                <PrimaryButton
                                  onClick={() => {
                                    navigate("/auth");
                                  }}
                                  name="Login"
                                  className="xl:px-[39px] px-[45px] py-2 primary-background !font-calibri text-lg font-bold sm:w-[139px] w-full"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ClickAwayListener>
            </div>
          </div>
          <div className="hidden justify-center mt-1 going_green_logo_mobile">
            <div className="flex gap-[22px]">
              <Link
                to={`/`}
                className="cursor-pointer text-[#63953B] text-[48px] font-abhaya font-bold"
              >
                G O I N G
              </Link>
              <Link
                to={`/`}
                className="cursor-pointer text-[#376513] text-[48px] font-abhaya font-bold"
              >
                G R E E N
              </Link>
            </div>
          </div>
          <Loading isLoading={isPending} />
        </header>
      </div>
      <AlertLogOutDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

export default HomeHeader;
