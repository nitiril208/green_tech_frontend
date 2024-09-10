import delet from "@/assets/images/delet.svg";
import Loading from "@/components/comman/Error/Loading";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { getTimeAgo } from "@/lib/utils";
import {
  deleteMultipleNotification,
  deleteNotificationById,
  fetchNotification,
} from "@/services/apiServices/notificationServices";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotificationListPage = () => {
  const [notificationIds, setNotificationIds] = useState<string[]>([]);
  const { UserId } = useSelector((state: any) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;
  const navigate = useNavigate();

  const { toast } = useToast();

  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];

  const queryClient = useQueryClient();

  const { data: notification_list, isPending } = useQuery({
    queryKey: [QUERY_KEYS.notificationList],
    queryFn: () => fetchNotification(userID),
    retry: false,
  });
  const { mutate: delete_notification, isPending: deletePanding } = useMutation(
    {
      mutationFn: (notificationId: string) =>
        deleteNotificationById(notificationId),
      onSuccess: () => {
        toast({ title: "Notification deleted Successfully" });
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
    }
  );

  const { mutate: delete_notifications, isPending: multipleDeletePanding } =
    useMutation({
      mutationFn: (notificationIds: string[]) =>
        deleteMultipleNotification(notificationIds),
      onSuccess: () => {
        toast({ title: "Notifications delete Successfully" });
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

  const toggleNotificationSelection = (notificationId: string) => {
    if (notificationIds.includes(notificationId)) {
      setNotificationIds(notificationIds.filter((id) => id !== notificationId));
    } else {
      setNotificationIds([...notificationIds, notificationId]);
    }
  };
  const toggleAllNotificationsSelection = () => {
    if (notificationIds.length === notification_list?.data?.data.length) {
      setNotificationIds([]);
    } else {
      setNotificationIds(
        notification_list?.data?.data.map(
          (notification: { id: string }) => notification.id
        ) || []
      );
    }
  };

  return (
    <div className="bg-primary-foreground rounded-[10px] h-full font-nunitoSans">
      <div className="border-b-2 flex justify-between items-center py-[24px] pl-[22px] pr-[32px]">
        <h2 className="text-base font-bold">Notification List</h2>
        <div className="flex items-center gap-[23px]">
          <div className="flex items-center gap-[8px]">
            <Checkbox
              checked={
                notificationIds.length ===
                  notification_list?.data?.data.length &&
                notification_list?.data?.data.length !== 0
              }
              onClick={toggleAllNotificationsSelection}
              disabled={notification_list?.data.data.length === 0}
            />
            <p className="text-[12px]">Select All</p>
          </div>
          <button
            onClick={() => {
              if (notificationIds.length === 0) {
                toast({
                  variant: "destructive",
                  title: "Please select more than one notification to delete",
                });
              } else if (notificationIds.length === 1) {
                delete_notification(notificationIds[0]);
              } else {
                delete_notifications(notificationIds);
              }
            }}
            disabled={notificationIds.length === 0}
            className="w-[14px] h-[17px]"
          >
            <img src={delet} alt="" className="w-[14px] h-[17px]" />
          </button>
        </div>
      </div>
      {notification_list?.data?.data.length > 0 ? (
        <div className="mt-[17px] mx-[20px] flex flex-col gap-[18px]">
          {notification_list?.data.data.map(
            (notification: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-[36px] shadow-[2px_2px_15px_0px_rgba(0,0,0,0.15)] py-[16px] pl-[17px] pr-[31px] rounded-[5px]"
                >
                  <Checkbox
                    checked={notificationIds.includes(notification.id)}
                    onChange={() =>
                      toggleNotificationSelection(notification.id)
                    }
                    onClick={() => toggleNotificationSelection(notification.id)}
                  />
                  <div className="flex flex-col gap-[9px] w-[90%]">
                    <p className="text-[12px] text-[#A3A3A3] max-w-[1250px]">
                      {getTimeAgo(notification.createdAt)}
                    </p>
                    <h3
                      className="text-[16px] font-bold"
                      onClick={() =>
                        navigate(
                          `/${currentUser}/notification/${notification.id}`
                        )
                      }
                    >
                      {notification.title}
                    </h3>
                    <p
                      className="text-[16px]"
                      dangerouslySetInnerHTML={{ __html: notification.content }}
                    ></p>
                  </div>
                  <button onClick={() => delete_notification(notification.id)}>
                    <img src={delet} alt="" className="w-[14px] h-[17px]" />
                  </button>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <div className="h-[calc(100vh_-_204px)] text-neutral-400 text-lg mx-[20px] flex justify-center items-center">
          No notification found
        </div>
      )}
      <Loading
        isLoading={isPending || deletePanding || multipleDeletePanding}
      />
    </div>
  );
};
export default NotificationListPage;
