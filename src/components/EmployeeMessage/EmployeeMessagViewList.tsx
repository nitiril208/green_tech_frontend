import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { chatDPColor, TimeFormatter } from "@/lib/utils";
import {
  fetchChatUserList,
  updateMessage,
} from "@/services/apiServices/chatServices";
import { DataEntity } from "@/types/Chat";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "../comman/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import MessageDetails from "./MessageDetails";
import { useChatBotContext } from "@/context/chatBotContext";

const EmployeeMessagViewList = () => {
  const [empId, setEmpId] = useState<null | DataEntity>(null);
  const queryClient = useQueryClient();
  const { UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const { group } = useChatBotContext();
  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;
  const { data: chatUserList, isPending: userListPending } = useQuery({
    queryKey: [QUERY_KEYS.chatUserList],
    queryFn: () => fetchChatUserList(userID.toString() as string),
  });

  const { mutate: updatemessage } = useMutation({
    mutationFn: (data: {
      userId1: number | string;
      userId2: number | string;
      isRead: boolean;
    }) => updateMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.chatUserList] });
    },
  });

  useEffect(() => {
    if (group) {
      setEmpId(group);
    }
  }, [group]);

  console.log("empIdempId", empId);

  return (
    <div className="lg:border-t border-t-none border-[#E5E5E5] pt-4 lg:min-h-[500px] flex flex-col gap-4 p-[15px]">
      {empId !== null ? (
        <MessageDetails empId={empId} setEmpId={setEmpId} />
      ) : (
        <>
          <div className="relative">
            <Input
              placeholder="Search..."
              className="text-[#A3A3A3] placeholder:text-[#A3A3A3] font-inter text-[15px] h-10 ps-10"
            />
            <Search
              width={16}
              className="absolute top-0 bottom-0 m-auto left-[12px] text-[#A3A3A3]"
            />
          </div>
          <ScrollArea
            className="max-h-[330px] overflow-y-auto overflow-x-hidden"
            id="scroll"
          >
            <div className="flex flex-col gap-3">
              {userListPending ? (
                <Loader />
              ) : (
                chatUserList?.data?.data &&
                chatUserList?.data?.data?.map((data, index: number) => {
                  return (
                    <div
                      className="flex items-start justify-between cursor-pointer gap-2 pb-3 last:pb-0 border-b last:border-none border-[#E5E5E5]"
                      key={index}
                      onClick={async () => {
                        setEmpId(data);
                        updatemessage({
                          userId1: userID,
                          userId2: data?.id,
                          isRead: true,
                        });
                        await queryClient.invalidateQueries({
                          queryKey: [QUERY_KEYS.chatList],
                        });
                      }}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="relative">
                          <Avatar className="min-w-10 min-h-10 w-10 h-10 rounded-full">
                            <AvatarImage src="" />
                            <AvatarFallback
                              className="text-white text-md"
                              style={{ backgroundColor: chatDPColor(data?.id) }}
                            >
                              {data.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute top-0 right-0 ${
                              data?.isOnline ? "bg-[#72CC79]" : "bg-[#D9D9D9]"
                            } z-[9] w-3 h-3 rounded-full`}
                          ></span>
                        </div>
                        <div className="relative">
                          <div className="flex items-start justify-between">
                            <h5 className="text-[16px] font-abhaya font-semibold text-black">
                              {data.name}
                            </h5>
                          </div>
                          <p className="text-sm line-clamp-1 font-abhaya font-semibold text-[#606060] max-w-[92%]">
                            {data.last_msg}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-abhaya max-w-[50px] w-full font-semibold text-[#606060]">
                          <span>{TimeFormatter(data.last_msg_time)}</span>
                        </div>
                        {data?.count > 0 && (
                          <span className="absolute bottom-0.5 right-0 text-[14px] flex items-center justify-center font-abhaya font-semibold bg-[#76BC41] w-4 h-4 rounded-full text-white">
                            {data?.count}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default EmployeeMessagViewList;
