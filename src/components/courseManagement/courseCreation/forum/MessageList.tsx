import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { chatDPColor, getTimeAgo } from "@/lib/utils";
import { createCommnets, createReply } from "@/services/apiServices/forum";
import { UserData } from "@/types/auth";
import { ErrorType } from "@/types/Errors";
import { ForumQuestionsType } from "@/types/forum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";

const MessageList = ({
  data,
  openCommnet,
  setopenCommnet,
}: {
  data: ForumQuestionsType;
  openCommnet: number;
  setopenCommnet: Dispatch<React.SetStateAction<number>>;
}) => {
  const queryClient = useQueryClient();
  const [newcommnet, setnewcommnet] = useState<string>("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [open, setopen] = useState<number>(0);
  const [replyMessage, setreplyMessage] = useState<string>("");
  const UserId = useSelector((state: UserData) => state.user.UserId);
  const userId = UserId ? UserId : userData?.query?.id;

  const { mutate } = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchforumquestion],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchModuleForumQuestion],
      });
    },
    onError: (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyMessage && userData?.query?.id && open) {
      mutate({
        reply: replyMessage,
        userId: +userData?.query?.id,
        commentId: open,
      });
    }
    setopen(0);
    setreplyMessage("");
  };

  const cretecommnets = useMutation({
    mutationFn: createCommnets,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchforumquestion],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchModuleForumQuestion],
      });
      setopenCommnet(0);
    },
    onError: (error: ErrorType) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.data.message,
      });
      setopenCommnet(0);
    },
  });

  const handleSubmitcommnet = (e: React.FormEvent) => {
    e.preventDefault();
    setnewcommnet("");
    if (newcommnet && data?.id && userId) {
      cretecommnets.mutate({
        comment: newcommnet,
        forumQuestionId: +data?.id,
        userId: +userId,
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex gap-4 ${
          openCommnet === data?.id ? "block" : "hidden"
        }`}
      >
        <form
          onSubmit={handleSubmitcommnet}
          className="bg-[#F5F7FF] rounded-lg py-2.5 px-4 w-full"
        >
          <Input
            placeholder={"messages"}
            className="border-none bg-transparent text-black text-sm font-inter px-0 placeholder:text-black"
            type="text"
            onChange={(e) => setnewcommnet(e.target.value)}
            value={newcommnet ?? ""}
          />
          <div className="text-right">
            <Button
              className="bg-[#42A7C3] text-xs px-5 h-[38px]"
              type="submit"
            >
              Post
            </Button>
          </div>
        </form>
      </div>

      {
        // commnetLoading ? (
        //   <Loader />
        // ) :
        data?.comments?.map((com) => {
          return (
            <>
              {/* show created commnet */}
              <div className={`flex gap-4 w-full`} key={com?.id}>
                <div className="min-w-[30px] w-[30px] min-h-[30px] h-[30px] rounded-full overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={""}
                      alt="profileImage"
                    />
                    <AvatarFallback
                      className="text-white text-xl"
                      style={{ background: chatDPColor(com?.user?.id) }}
                    >
                      {com.user?.trainerCompanyDetails?.providerName?.charAt(0) || com.user?.email
                          ?.split("@")[0]
                          .charAt(0)  || com.user?.trainerDetails?.providerName?.charAt(0) ||
                        com.user?.email
                          ?.split("@")[0]
                          .charAt(0)
                          }
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col gap-2 w-full ">
                  <div className="bg-[#F5F7FF] rounded-lg py-2.5 px-4">
                    <h5 className="font-inter text-sm tetx-black font-semibold pb-1.5">
                      {com.user?.trainerCompanyDetails?.providerName || com.user?.trainerDetails?.providerName}
                    </h5>
                    <p className="text-black text-sm font-inter">
                      {com?.comment}
                    </p>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-6 text-[#606060] text-xs">
                      {getTimeAgo(com.createdAt)}
                      <Button
                        className={`cursor-pointer text-xs p-0 bg-transparent text-black font-inter h-4 ${
                          com.reply ? "hidden" : "block"
                        }`}
                        onClick={() => setopen(com?.id)}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* crete reply box */}
              <div
                className={`xl:ms-[35px] ms-[25px]  ${
                  open === com?.id ? "block" : " hidden"
                } `}
              >
                <div className="flex gap-4">
                  <div className="min-w-[30px] w-[30px] min-h-[30px] h-[30px] rounded-full overflow-hidden">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={""} alt="profileImage" />
                      <AvatarFallback
                        className="text-white text-xl"
                        style={{ background: chatDPColor(userData?.query?.id) }}
                      >
                        {userData?.query?.name?.charAt(0)?.toUpperCase() ||
                          userData?.query?.email?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-[#F5F7FF] rounded-lg py-2.5 px-4 w-full"
                  >
                    <h5 className="font-inter text-sm tetx-black font-semibold">
                      {userData?.query?.name}
                    </h5>
                    <Input
                      placeholder={"messages"}
                      className="border-none bg-transparent text-black text-sm font-inter px-0 placeholder:text-black"
                      type="text"
                      onChange={(e) => setreplyMessage(e.target.value)}
                      // value={replyMessage ?? ""}
                    />
                    <div className="text-right">
                      <Button
                        className="bg-[#42A7C3] text-xs px-5 h-[38px]"
                        type="submit"
                      >
                        Post
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              {/* show creted reply output */}
              <div
                className={`flex gap-4 w-full flex-row ms-[15px]  ${
                  com?.reply === null ? "hidden" : "block"
                }`}
              >
                <div className="min-w-[30px] w-[30px] min-h-[30px] h-[30px] rounded-full overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={""} alt="profileImage" />
                    <AvatarFallback
                      className="text-white text-xl"
                      style={{ background: chatDPColor(userData?.query?.id) }}
                    >
                      {userData?.query?.name?.charAt(0)?.toUpperCase() ||
                        userData?.query?.email?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="bg-[#F5F7FF] rounded-lg py-2.5 px-4 w-full">
                  <h5 className="font-inter text-sm tetx-black font-semibold">
                    {userData?.query?.name}
                  </h5>
                  <Input
                    placeholder={"messages"}
                    className="border-none bg-transparent text-black text-sm font-inter px-0 placeholder:text-black"
                    type="text"
                    value={com?.reply as string}
                  />
                </div>
              </div>
            </>
          );
        })
      }
    </div>
  );
};

export default MessageList;
