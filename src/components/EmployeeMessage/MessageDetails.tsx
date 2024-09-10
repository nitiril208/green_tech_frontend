import { useChatBotContext } from "@/context/chatBotContext";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { chatDPColor, TimesFormatter } from "@/lib/utils";
import {
  fetchChat,
  fetchGroupChat,
  sendGroupMessage,
  sendMessage,
} from "@/services/apiServices/chatServices";
import { ChatDetailsList, DataEntity } from "@/types/Chat";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoveLeft, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { io } from "socket.io-client";
import * as z from "zod";
import InputWithLabel from "../comman/InputWithLabel";
import Loader from "../comman/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface MessageDetailsProps {
  empId: DataEntity;
  setEmpId: React.Dispatch<React.SetStateAction<DataEntity | null>>;
}

const schema = z.object({
  message: z.string().min(1, { message: "Please enter message" }),
});

let socket: any;

const MessageDetails = ({ empId, setEmpId }: MessageDetailsProps) => {
  const queryClient = useQueryClient();
  const [allMsg, setAllMsg] = useState<ChatDetailsList[]>([]);
  const { UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { group } = useChatBotContext();
  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_URL);
    socket.on("message recieved", (newMessageReceived: any) => {
      setAllMsg((prevMsgs: any) => {
        const isDuplicate = prevMsgs.some(
          (msg: any) => msg.id === newMessageReceived.id
        );

        if (!isDuplicate) {
          return [...prevMsgs, newMessageReceived];
        }
        return prevMsgs;
      });

      // !!UserId && !!chatId && (await refetchChat());
      // await refetchUserList();
    });

    return () => {
      socket.disconnect();
    };
  }, [empId, UserId]);

  const { data: chatList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.chatList],
    queryFn: () => fetchChat(userID, empId.id),
    enabled: !!userID && !!empId?.id,
  });

  const { data: groupChat } = useQuery({
    queryKey: [QUERY_KEYS.fetchGroupChat],
    queryFn: () => fetchGroupChat(group?.id),
    enabled: !!group,
  });

  const { mutate: Send, isPending: sendPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatList],
      });
      socket.emit("new message", data?.data);
      reset();
    },
  });

  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendGroupMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchGroupChat] });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const handleSend = (data: FieldValues) => {
    if (group) {
      const payload = {
        groupId: group?.id,
        senderId: userID,
        message: data?.message,
      };
      sendMessageMutation(payload);
    } else {
      Send({
        senderId: userID,
        receiverId: empId.id,
        message: data?.message,
      });
    }
  };

  useEffect(() => {
    if (group) {
      // @ts-ignore
      setAllMsg(groupChat?.data?.groupMessages || []);
    } else {
      setAllMsg(chatList?.data?.data || []);
    }
  }, [chatList, group]);

  useEffect(() => {
    if (allMsg) {
      const scrollElement = document.getElementById("scrolling");
      if (scrollElement) {
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: "smooth", // This enables smooth scrolling
        });
      }
    }
  }, [allMsg]);

  return (
    <div>
      <div className="flex justify-between  gap-3 items-center border-b pb-3">
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Avatar className="min-w-10 min-h-10 w-10 h-10 rounded-full">
              <AvatarImage src="" />
              <AvatarFallback>{empId.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span
              className={`absolute top-0 right-0 ${
                empId?.isOnline ? "bg-[#72CC79]" : "bg-[#D9D9D9]"
              } z-[9] w-3 h-3 rounded-full`}
            ></span>
          </div>
          <h5 className="text-[16px] font-abhaya font-semibold text-black">
            {empId.name}
          </h5>
        </div>
        <Button
          type="button"
          onClick={() => setEmpId(null)}
          variant={"ghost"}
          className="hover:bg-transparent"
        >
          <MoveLeft />
        </Button>
      </div>
      <div className="flex flex-col gap-2 justify-between py-4 h-[calc(500px-83px)]">
        <div
          id="scrolling"
          className="h-[calc(430px-63px)] overflow-auto flex flex-col gap-y-4"
        >
          {isLoading ? (
            <Loader />
          ) : (
            allMsg?.map((data, index: number) => {
              return (
                <>
                  {userID === data?.senderId?.id ? (
                    <div
                      className="flex items-start justify-end gap-3"
                      key={index}
                    >
                      <div className="max-w-[70%] min-w-[100px] rounded-2xl bg-zinc-200 px-3 py-2 text-sm shadow">
                        <p>{data.message}</p>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {TimesFormatter(data?.createdAt)}
                        </div>
                      </div>
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={""} />
                        <AvatarFallback
                          className="text-white text-md uppercase"
                          style={{
                            backgroundColor: chatDPColor(data?.senderId?.id),
                          }}
                        >
                          {data?.senderId?.name
                            ? data?.senderId?.name?.charAt(0) +
                              "" +
                              data?.senderId?.name?.charAt(1)
                            : data?.senderId?.email.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3" key={index}>
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={""} />
                        <AvatarFallback
                          className="text-white text-md uppercase"
                          style={{
                            backgroundColor: chatDPColor(data?.senderId?.id),
                          }}
                        >
                          {data?.senderId?.name
                            ? data?.senderId?.name?.charAt(0) +
                              "" +
                              data?.senderId?.name?.charAt(1)
                            : data?.senderId?.email.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="max-w-[70%] min-w-[100px] rounded-2xl bg-muted px-3 py-2 text-sm shadow">
                        <p>{data.message}</p>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {TimesFormatter(data?.createdAt)}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })
          )}
        </div>
        <form onSubmit={handleSubmit(handleSend)}>
          <div className="flex items-center gap-3">
            <InputWithLabel
              type="text"
              placeholder="Enter Message"
              mainClassName="w-full"
              {...register("message")}
            />
            <Button disabled={!isValid} className="h-[36px] py-2 bg-[#76BC41]">
              {sendPending ? <Loader /> : <SendHorizontal className="w-5" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageDetails;
