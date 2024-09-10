import { ConfirmModal } from "@/components/comman/ConfirmModal";
import Loading from "@/components/comman/Error/Loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getTimeAgo } from "@/lib/utils";
import { setPath } from "@/redux/reducer/PathReducer";
import {
  deleteNotificationById,
  fetchNotificationById,
  markAsReadUnread,
} from "@/services/apiServices/notificationServices";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();
  const { notificationId } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const dispatch = useAppDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.notification, notificationId],
    queryFn: () => fetchNotificationById(notificationId as string),
    retry: false,
  });
  const { mutate: mark_as_read, isPending: markAsReadPanding } = useMutation({
    mutationFn: () =>
      markAsReadUnread({
        notificationId: notificationId as string,
        read: true,
      }),
    onSuccess: () => {
      toast({ title: "Notification read Successfully" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.notificationList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.notificationCount],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });
  const { mutate: delete_notification, isPending: deletePanding } = useMutation(
    {
      mutationFn: () => deleteNotificationById(notificationId as string),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.notificationList],
        });
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.notificationCount],
        });
        setIsDelete(false);
        navigate(`/${currentUser}/notification-list`);
        toast({ title: "Notification deleted Successfully" });
      },
      onError: (error: ErrorType) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    }
  );
  const notificationDetails = data?.data.data;
  const handleDelete = () => {
    delete_notification();
  };
  return (
    <div className="h-full rounded-[10px] bg-[white] mb-[20px] font-nunitoSans">
      <div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
        <h2 className="font-[700] text-[16px]">Notification List</h2>
        <button
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
          className="text-[16px] font-[600] flex items-center gap-[15px] "
        >
          <HiOutlineArrowNarrowLeft />
          Back
        </button>
      </div>

      <div className=" h-[auto]  border rounded-lg shadow m-[20px] px-[30px] py-[16px] font-nunitoSans">
        <p className="text-[12px] leading-[16px] text-[#A3A3A3] font-[400]">
          {notificationDetails?.createdAt &&
            getTimeAgo(notificationDetails?.createdAt)}
        </p>
        <h3 className="text-[16px] font-[700] leading-[21px] mt-[9px]">
          {notificationDetails?.title}
        </h3>
        <p
          className="mt-[9px] text-[12px] md:text-[16px] md:leading-[22px] leading-[14px] h-[auto]"
          dangerouslySetInnerHTML={{ __html: notificationDetails?.content }}
        ></p>

        <div className="mt-[40px] w-full md:block flex justify-center flex-wrap gap-[10px]">
          <Button
            className="bg-[#FF5252] py-[10px] px-[20px] h-[42px] text-[16px]"
            onClick={() => setIsDelete(true)}
          >
            DELETE
          </Button>
          <Button
            className="py-[10px] px-[20px] h-[42px] text-[16px] ml-[21px]"
            onClick={() => mark_as_read()}
          >
            MARK AS READ
          </Button>
        </div>
      </div>
      <ConfirmModal
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onDelete={handleDelete}
        value={notificationDetails?.title || ""}
        isLoading={isPending}
      />
      <Loading isLoading={isPending || markAsReadPanding || deletePanding} />
    </div>
  );
}

export default Notification;
