import { SidebarContext } from "@/context/Sidebarcontext";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { sidebarLayout } from "@/lib/utils";
import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut } from "@/services/apiServices/authService";
import { fetchNotificationCount } from "@/services/apiServices/notificationServices";
import { ResponseError } from "@/types/Errors";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { IoIosNotificationsOutline, IoMdArrowDropdown } from "react-icons/io";
import { VscBellDot } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../assets/images/logo2.png";
import { BreadcrumbWithCustomSeparator } from "./comman/Breadcrumb";
import Loading from "./comman/Error/Loading";
import Modal from "./comman/Modal";
import DrawerPage from "./DrawerPage";
import { SidebarItem } from "./layouts/DashboardLayout";
import { AlertLogOutDialog } from "./Models/AlertLogOut";
import ModalTabs from "./myCourse/ModalTab/ModalTabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "./ui/use-toast";

const MainHeader = () => {
  const navigate = useNavigate();
  const { UserId } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const { setSidebarOpen, sidebarOpen } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState("");
  const [data, setData] = useState<SidebarItem[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userRole = userData?.query?.role;
  const userID = UserId ? UserId : userData?.query?.id;
  const dispatch = useAppDispatch();

  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];

  useEffect(() => {
    switch (+userRole) {
      case 1:
        setData(sidebarLayout.companySidebar);
        break;
      case 2:
        setData(sidebarLayout.TarinerSidebar);
        break;
      case 3:
        setData(sidebarLayout.TarineeSidebar);
        break;
      case 4:
        setData(sidebarLayout.companyEmployeeSidebar);
        break;
    }
  }, [userRole]);

  const { data: notification_count } = useQuery({
    queryKey: [QUERY_KEYS.notificationCount],
    queryFn: () => fetchNotificationCount(userID),
  });
  const { mutate, isPending } = useMutation({
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

  const handleLogout = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmLogout = () => {
    mutate(userData?.query?.id);
  };
  return (
    <>
      <header className="sm:bg-[#fff] bg-transparent z-10">
        <Button
          variant={"ghost"}
          type="button"
          className="lg:block hidden h-auto shadow-xl p-1 top-8 bg-white rounded-lg rounded-tl-none rounded-bl-none hover:bg-white absolute left-0 "
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <ChevronLeft className="sm:w-8 sm:h-8 h-6 w-6" />
          ) : (
            <ChevronRight className="sm:w-8 sm:h-8 h-6 w-6" />
          )}
        </Button>
        <div className=" text-[#3A3A3A] font-[calibri] first-line:items-center justify-between items-center xl:px-6 sm:px-5 px-4 w-full sm:flex hidden h-[120px] sm:leading-[120px] leading-[90px]">
          <ul className="flex items-center font-normal text-[16px] sm:gap-5 gap-3 w-[33%]">
            <li className="pl-8">
              {/* {title} */}
              <h3 className="xl:text-[20px] text-lg font-bold font-nunito text-black capitalize leading-[22px] h-auto mb-2 line-clamp-1">
                Welcome
                {/* <span className="text-[14px]">
                  {+userData?.query?.role === 1
                    ? userData?.query?.name ||
                      userData?.query?.email?.split("@")[0]
                    : `${
                        userData?.query?.fname ? userData?.query?.fname : ""
                      } ${
                        userData?.query?.lname ? userData?.query?.lname : ""
                      }` || userData?.query?.email?.split("@")[0]}
                </span> */}
              </h3>
              <BreadcrumbWithCustomSeparator />
            </li>
          </ul>
          <div className="flex-col justify-end md:flex hidden w-[33%]">
            <div className="flex gap-[22px] justify-center">
              <Link
                to={`/`}
                className="cursor-pointer text-[#63953B] 2xl:text-[48px] xl:text-[30px] text-[24px] font-abhaya font-bold"
              >
                G O I N G
              </Link>
              <Link
                to={`/`}
                className="cursor-pointer text-[#376513] 2xl:text-[48px] xl:text-[30px] text-[24px] font-abhaya font-bold"
              >
                G R E E N
              </Link>
            </div>
          </div>

          <div className="flex xl:gap-4 sm:gap-3 gap-1 w-[33%] justify-end">
            <div className="text-sm flex items-center xl:gap-9 sm:gap-6 gap-3 relative">
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-[45px] h-[45px] text-sm  text-center bg-[#F5F5F5] rounded-[50%] focus:ring-4 font-abhaya"
              >
                <IoIosNotificationsOutline
                  className="text-[30px]"
                  onClick={() =>
                    dispatch(
                      setPath([
                        {
                          label: "Notification List",
                          link: `/${currentUser}/notification-list`,
                        },
                      ])
                    )
                  }
                />
                {notification_count?.data?.count > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {notification_count?.data?.count}
                  </div>
                )}
              </button>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger className="sm:text-[18px] text-base flex items-center gap-1 ">
                    <Avatar>
                      <AvatarImage
                        src={
                          userData?.query?.trainerCompanyDetails?.profileImage
                        }
                      />
                      <AvatarFallback>
                        {userData?.query?.fname?.charAt(0) ||
                          userData?.query?.email?.split("@")[0]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>{" "}
                    Hi,{" "}
                    {userData?.query?.fname || userData?.query?.lname
                      ? `${userData?.query?.fname || ""} ${
                          userData?.query?.lname || ""
                        }`.trim()
                      : userData?.query?.email?.split("@")[0]}
                    {/* {(userData?.query?.fname || userData?.query?.lname) ? (userData?.query?.fname &&
                      userData?.query?.fname) + " " + (userData?.query?.lname &&
                      userData?.query?.lname) :
                      userData?.query?.name ? userData?.query?.name :
                      userData?.query?.email?.split("@")[0]} */}
                    <IoMdArrowDropdown className="w-[20px] h-[20px]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(true);
                        setOpenType("profile");
                      }}
                    >
                      Profile Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(true);
                        setOpenType("account");
                      }}
                    >
                      Account Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* <div className="lg:block hidden">
              <img
                className="md:w-[136px] md:h-[105px] w-[100px] h-[75px]"
                src={Logo2}
                alt="Logo 2"
              />
            </div> */}
          </div>
        </div>
        <div className="sm:p-5 px-5 pt-5 pb-0 text-[#3A3A3A] font-[calibri] items-center justify-between w-full sm:hidden block">
          <div className="flex items-center font-normal text-[16px] sm:gap-5 gap-3 justify-between">
            <div className="flex items-center gap-2.5">
              <div className="">
                <AlignLeft
                  className="sm:w-8 sm:h-8 h-6 w-6"
                  onClick={() => setOpen(true)}
                />
              </div>

              {/* <p className="text-xl font-bold font-nunito text-black line-clamp-1 capitalize">
                {title[title?.length - 1]?.label}
              </p> */}
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
              <VscBellDot
                className="w-[24px] h-[24px] leading-10"
                onClick={() =>
                  dispatch(
                    setPath([
                      {
                        label: "Notification List",
                        link: `/${currentUser}/notification-list`,
                      },
                    ])
                  )
                }
              />
            </div>
          </div>

          <div className="flex justify-between py-2.5">
            <div className="text-sm flex items-center xl:gap-9 sm:gap-6 gap-3 relative">
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger className="sm:text-[18px] text-base flex items-center gap-1 ">
                    <Avatar>
                      <AvatarImage
                        src={
                          userData?.query?.trainerCompanyDetails?.profileImage
                        }
                      />
                      <AvatarFallback>
                        {userData?.query?.fname?.charAt(0) ||
                          userData?.query?.email?.split("@")[0]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>{" "}
                    Hi,{" "}
                    {userData?.query?.fname + "" + userData?.query?.lname ||
                      userData?.query?.email?.split("@")[0]}
                    <IoMdArrowDropdown className="w-[20px] h-[20px]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(true);
                        setOpenType("profile");
                      }}
                    >
                      Profile Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(true);
                        setOpenType("account");
                      }}
                    >
                      Account Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="">
              <img className="w-[81px] h-[64px]" src={Logo2} alt="Logo 2" />
            </div>
          </div>
        </div>
      </header>
      <div className="lg:invisible visible">
        <DrawerPage sidebarItems={data} open={open} setOpen={setOpen} />
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-[610px] sm:max-w-xl max-w-[335px] p-5 rounded-xl"
        header="Settings"
        titleClassName="font-nunito text-xl text-black font-bold"
      >
        <ModalTabs tab={openType} handleClose={() => setIsOpen(false)} />
      </Modal>
      {isPending && <Loading isLoading={isPending} />}
      <AlertLogOutDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default MainHeader;
