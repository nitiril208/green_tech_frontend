import Loading from "@/components/comman/Error/Loading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AccountSetting from "./AccountSetting";
import ProfileSetting from "./ProfileSetting";
import { setPath } from "@/redux/reducer/PathReducer";
import { useAppDispatch } from "@/hooks/use-redux";
import { AlertLogOutDialog } from "@/components/Models/AlertLogOut";
import { useState } from "react";
import Cookies from "js-cookie";

const ModalTabs = ({
  tab = "profile",
  handleClose,
}: {
  tab?: string;
  handleClose: () => void;
}) => {
  const dispatch=useAppDispatch()
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

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
      <Tabs defaultValue={tab} className="w-full grid grid-cols-12">
        <div className="sm:col-span-3 col-span-12 sm:mb-0 mb-4">
          <TabsList className="p-0 flex sm:flex-col justify-start gap-3 w-full h-full">
            <TabsTrigger
              value="profile"
              className="sm:text-[13px] text-xs font-Poppins w-full py-2.5 hover:bg-[#00778B] hover:text-white rounded-md bg-[#F5F5F5] text-[#606060] sm:inline-block hidden data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B] px-3 text-left"
            >
              Profile Setting
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="sm:text-[13px] text-xs font-Poppins w-full hover:bg-[#00778B] hover:text-white py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] sm:inline-block hidden data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B] px-3 text-left"
            >
              Account Setting
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="sm:hidden sm:text-[13px] text-xs font-Poppins w-full py-2.5 hover:bg-[#00778B] hover:text-white rounded-md bg-[#F5F5F5] text-[#606060] inline-block data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B] px-3 text-center"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="sm:hidden sm:text-[13px] text-xs font-Poppins w-full hover:bg-[#00778B] hover:text-white py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] inline-block data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B] px-3 text-center"
            >
              Account
            </TabsTrigger>
            <Button
              variant={"ghost"}
              type="button"
              onClick={handleLogout}
              className="sm:text-[13px] text-xs font-Poppins w-full py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] hover:bg-[#00778B] hover:text-white px-3 sm:text-left text-center justify-center"
            >
              Log Out
            </Button>
          </TabsList>
        </div>
        <div className="sm:col-span-9 col-span-12 sm:ps-5 ps-0 sm:border-l border-l-none border-[#3E4E4E4] sm:ms-5 ms-0">
          <TabsContent value="profile" className="m-0">
            <ProfileSetting handleClose={handleClose} />
          </TabsContent>
          <TabsContent value="account" className="m-0">
            <AccountSetting handleClose={handleClose} />
          </TabsContent>
          {/* <TabsContent value="logout" className="m-0">
          Log Out
        </TabsContent> */}
        </div>
        <Loading isLoading={isPending} />
      </Tabs>
      <AlertLogOutDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default ModalTabs;
