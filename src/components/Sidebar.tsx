import sidebarlogo2 from "@/assets/images/logo2.png";
import { SidebarContext } from "@/context/Sidebarcontext";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut } from "@/services/apiServices/authService";
import { fetchChatUserList } from "@/services/apiServices/chatServices";
import { ResponseError } from "@/types/Errors";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/wing.png";
import Loading from "./comman/Error/Loading";
import { AlertLogOutDialog } from "./Models/AlertLogOut";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "./ui/use-toast";
import sidebarlogo from "/assets/img/sidebarlogo.png";

interface SidebarItem {
  label: string;
  Icon: IconType;
  link: string;
  children: {
    label: string;
    link: string;
  }[];
}

const Sidebar = ({ sidebarItems }: { sidebarItems: SidebarItem[] }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { UserId } = useAppSelector((state) => state?.user);
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { sidebarOpen } = useContext(SidebarContext);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId ? UserId : userData?.query?.id;

  const toggleDropdown = (
    children: { label: string; link: string }[],
    index: number
  ) => {
    if (children?.length > 0) {
      // setIsOpen({ ...isOpen, [`bar${index + 1}`]: !isOpen[`bar${index + 1}`] });
      setIsOpen({ [`bar${index + 1}`]: !isOpen[`bar${index + 1}`] });
    }
  };

  useEffect(() => {
    sidebarItems.forEach((item, index) => {
      if (item?.children?.length > 0) {
        // setIsOpen({ ...isOpen, [`bar${index + 1}`]: false });
        setIsOpen({ [`bar${index + 1}`]: false });
      }
    });
  }, []);

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      dispatch(setPath([{ label: `Dashboard`, link: null }]));
    }
  }, [location.pathname]);

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

  const handleConfirmLogout = () => {
    mutate(userID);
  };

  const handleLogout = () => {
    setIsAlertOpen(true);
  };

  const { data: chatUserList } = useQuery({
    queryKey: [QUERY_KEYS.chatUserList],
    queryFn: () => fetchChatUserList(userID as string),
  });
  const newMessage = chatUserList?.data?.data?.some((item) => item?.count > 0);
  console.log("isOpenisOpen", isOpen);

  return (
    <div
      className={`relative lg:flex flex-col justify-between ${
        sidebarOpen ? "2xl:w-[260px] w-[235px]" : "2xl:w-[60px] w-[235px]"
      } duration-500 bg-[#FFFFFF] overflow-hidden`}
    >
      {/* <Button
        variant={"ghost"}
        type="button"
        className="absolute shadow-xl p-1 rounded-lg -right-[10px] top-10 z-20 bg-white lg:block hidden h-auto"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <ChevronLeft className="sm:w-8 sm:h-8 h-6 w-6" />
        ) : (
          <ChevronRight className="sm:w-8 sm:h-8 h-6 w-6" />
        )}
      </Button> */}
      <div className="h-screen overflow-auto">
        {sidebarOpen ? (
          <div className="ml-[20px] mt-[20px] flex items-center">
            <Link to={"/"}>
              <img src={sidebarlogo} alt="logo" width={121.17} height={80} />
            </Link>
            <Link to={"/"}>
              <img src={sidebarlogo2} alt="logo" width={121.17} height={80} />
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center my-[20px]">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-[40px]" />
            </Link>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-4 relative">
          {sidebarItems.map((item, index) => {
            const Icon = item.Icon;
            return (
              <div key={index}>
                {item.label !== "Logout" ? (
                  <>
                    {sidebarOpen && (
                      <Link
                        to={item.link}
                        onClick={() => {
                          toggleDropdown(item.children, index);
                          {
                            item?.children.length === 0 && setIsOpen({});
                            dispatch(
                              setPath([{ label: `${item.label}`, link: null }])
                            );
                          }
                        }}
                        className={`relative group flex items-center ${
                          sidebarOpen ? "justify-between" : "justify-center"
                        } text-[16px] leading-5 font-[400] p-[10px] rounded-md text-[#606060] font-calibri ${
                          item.children.find(
                            (child) => child.link === location.pathname
                            // || isOpen?.[`bar${index + 1}`]
                          ) || location.pathname.includes(item.link)
                            ? "bg-[#00778B] text-white"
                            : "bg-[#fff]"
                        } `}
                      >
                        <div className="flex items-center gap-2">
                          {item?.label === "Message" && newMessage && (
                            <GoDotFill
                              className="absolute top-1.5 left-[22px]"
                              fill={"#008000"}
                            />
                          )}
                          <Icon size={22} />
                          {sidebarOpen && <h2>{item.label}</h2>}
                        </div>
                        {sidebarOpen &&
                          item.children?.length > 0 &&
                          !isOpen[`bar${index + 1}`] && <HiChevronRight />}
                        {sidebarOpen &&
                          item.children?.length > 0 &&
                          isOpen[`bar${index + 1}`] && <HiChevronDown />}
                      </Link>
                    )}
                    {!sidebarOpen &&
                      (item.children?.length === 0 ? (
                        <Link
                          to={item.link}
                          onClick={() => {
                            toggleDropdown(item.children, index);
                          }}
                          className={`relative group flex items-center ${
                            sidebarOpen ? "justify-between" : "justify-center"
                          } text-[16px] leading-5 font-[400] p-[10px] hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri ${
                            item.children.find(
                              (child) =>
                                child.link === location.pathname ||
                                isOpen?.[`bar${index + 1}`]
                            ) || location.pathname.includes(item.link)
                              ? "bg-[#00778B] text-white"
                              : "bg-[#fff]"
                          } `}
                        >
                          <div className="flex items-center gap-2">
                            {item?.label === "Message" && newMessage && (
                              <GoDotFill
                                className="absolute top-1.5 left-[22px]"
                                fill={"#008000"}
                              />
                            )}
                            <Icon size={22} />
                            {sidebarOpen && <h2>{item.label}</h2>}
                          </div>
                          {sidebarOpen &&
                            item.children?.length > 0 &&
                            !isOpen[`bar${index + 1}`] && <HiChevronRight />}
                          {sidebarOpen &&
                            item.children?.length > 0 &&
                            isOpen[`bar${index + 1}`] && <HiChevronDown />}
                        </Link>
                      ) : (
                        <Popover
                          onOpenChange={() => {
                            toggleDropdown(item.children, index);
                          }}
                          open={isOpen[`bar${index + 1}`]}
                        >
                          <PopoverTrigger
                            className={`flex items-center justify-center rounded-md w-full h-full p-[10px] hover:bg-[#00778B] hover:text-white ${
                              item.children.find(
                                (child) =>
                                  child.link === location.pathname ||
                                  isOpen?.[`bar${index + 1}`]
                              )
                                ? "bg-[#00778B] text-white"
                                : "bg-[#fff]"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Icon size={22} />
                              {sidebarOpen && <h2>{item.label}</h2>}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent side="right">
                            <ul className="bg-white rounded-md list-disc list-inside px-6 py-3 w-[245px]">
                              {item.children.map(
                                (child, childIndex: number) => (
                                  <li
                                    className={`text-[16px] leading-5 text-[#606060] py-1 font-calibri ${
                                      location.pathname.includes(child.link)
                                        ? "font-[700]"
                                        : "font-[400]"
                                    }`}
                                    key={childIndex}
                                  >
                                    <Link
                                      to={child.link}
                                      onClick={() => {
                                        toggleDropdown(item.children, index);
                                        dispatch(
                                          setPath([
                                            {
                                              label: `${item.children[index]?.label}`,
                                              link: `${item.children[index]?.link}`,
                                            },
                                          ])
                                        );
                                      }}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </PopoverContent>
                        </Popover>
                      ))}
                    {sidebarOpen &&
                      item.children?.length > 0 &&
                      isOpen[`bar${index + 1}`] && (
                        <ul className="bg-white rounded-md list-disc pl-6 w-[245px]">
                          {item.children.map((child, childIndex: number) => (
                            <li
                              className={`ml-[20px] text-[16px] leading-5 mt-2 text-[#606060] font-calibri ${
                                location.pathname.includes(child.link)
                                  ? "font-[700]"
                                  : "font-[400]"
                              }`}
                              key={childIndex}
                            >
                              <Link
                                to={child.link}
                                onClick={() =>
                                  dispatch(
                                    setPath([
                                      {
                                        label: `${item.label}`,
                                        link: null,
                                      },
                                      {
                                        label: `${child?.label}`,
                                        link: `${child?.link}`,
                                      },
                                    ])
                                  )
                                }
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </>
                ) : (
                  <Button
                    variant={"ghost"}
                    onClick={handleLogout}
                    className={`group flex items-center ${
                      sidebarOpen ? "justify-start" : "justify-center"
                    } text-[16px] leading-5 gap-2 font-[400] p-[10px] hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri w-full text-left`}
                  >
                    <Icon size={22} />
                    {sidebarOpen && <h2>{item.label}</h2>}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {isPending && <Loading isLoading={isPending} />}
      <AlertLogOutDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Sidebar;
