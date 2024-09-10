import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, useEffect, useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Drawer from "./comman/Drawer";
import Loading from "./comman/Error/Loading";
import { AlertLogOutDialog } from "./Models/AlertLogOut";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import sidebarlogo from "/assets/img/sidebarlogo.png";
import Cookies from "js-cookie";

interface SidebarItem {
  label: string;
  Icon: IconType;
  link: string;
  children: {
    label: string;
    link: string;
  }[];
}

const DrawerPage = ({
  sidebarItems,
  open,
  setOpen,
}: {
  sidebarItems: SidebarItem[];
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const toggleDropdown = (
    children: { label: string; link: string }[],
    index: number
  ) => {
    if (children?.length > 0) {
      setIsOpen({ ...isOpen, [`bar${index + 1}`]: !isOpen[`bar${index + 1}`] });
    }
  };

  useEffect(() => {
    sidebarItems.forEach((item, index) => {
      if (item?.children?.length > 0) {
        setIsOpen({ ...isOpen, [`bar${index + 1}`]: false });
      }
    });
  }, []);

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
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmLogout = () => {
    const userId = userData?.query?.id;
    mutate(userId);
  };

  return (
    <>
      <Drawer
        open={open}
        className="sm:max-w-[280px] p-0"
        onClose={() => setOpen(false)}
      >
        <div className="top-0 left-0 lg:flex flex-col justify-between duration-500 bg-[#FFFFFF] overflow-hidden">
          <div className="h-[100vh] overflow-auto p-5">
            <div className="flex items-center justify-center">
              <Button
                type="button"
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
                className="flex items-center gap-2  focus-visible:ring-0 hover:bg-transparent h-auto"
                variant="ghost"
              >
                <img src={sidebarlogo} alt="logo" width={121.17} height={80} />
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
              {sidebarItems.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <div key={index}>
                    {item.label !== "Logout" ? (
                      <>
                        <Link
                          to={item.link}
                          onClick={() => {
                            toggleDropdown(item.children, index);
                            item.children?.length === 0 && setOpen(false);
                          }}
                          className={`group flex items-center justify-between text-[16px] leading-5 font-[400] p-[10px] sm:hover:bg-[#00778B] sm:hover:text-white rounded-md text-[#606060] font-calibri ${
                            isOpen[`bar${index + 1}`] ||
                            location.pathname.includes(item.link)
                              ? "bg-[#00778B] text-white"
                              : "bg-[#fff]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={22} />
                            <h2>{item.label}</h2>
                          </div>
                          {item.children?.length > 0 &&
                            !isOpen[`bar${index + 1}`] && <HiChevronRight />}
                          {item.children?.length > 0 &&
                            isOpen[`bar${index + 1}`] && <HiChevronDown />}
                        </Link>
                        {item.children?.length > 0 &&
                          isOpen[`bar${index + 1}`] && (
                            <ul className="bg-white rounded-md list-disc pl-6 w-[245px]">
                              {item.children.map(
                                (child, childIndex: number) => (
                                  <li
                                    className={`ml-[20px] text-[16px] leading-5 mt-0 text-[#606060] font-calibri ${
                                      location.pathname.includes(child.link)
                                        ? "font-[700]"
                                        : "font-[400]"
                                    }`}
                                    key={childIndex}
                                  >
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        navigate(child.link);
                                        setOpen(false);
                                      }}
                                      className="flex items-center gap-2"
                                      variant="ghost"
                                    >
                                      {child.label}
                                    </Button>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                      </>
                    ) : (
                      <Button
                        variant={"ghost"}
                        onClick={handleLogout}
                        className="group flex items-center justify-start text-[16px] leading-5 gap-2 font-[400] p-[10px] hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri w-full text-left"
                      >
                        <Icon size={22} />
                        <h2>{item.label}</h2>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {isPending && <Loading isLoading={isPending} />}
        </div>
      </Drawer>
      <AlertLogOutDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default DrawerPage;
