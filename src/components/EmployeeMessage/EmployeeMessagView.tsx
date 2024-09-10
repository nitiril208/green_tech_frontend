import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchChatUserList } from "@/services/apiServices/chatServices";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const EmployeeMessagView = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { UserId } = useAppSelector((state) => state.user);
  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;
  // const { data: chatUserList } = useQuery({
  //   queryKey: [QUERY_KEYS.chatUserList],
  //   queryFn: () => fetchChatUserList(userID.toString() as string),
  // });
  const { data: chatUserList } = useQuery({
    queryKey: [QUERY_KEYS.chatUserList],
    queryFn: () => fetchChatUserList(userID.toString() as string),
  });

  const userName =
    userData &&
    (userData?.query?.fname && userData?.query?.lname
      ? userData?.query?.fname + "" + userData?.query?.lname
      : userData?.query?.name
      ? userData?.query?.name
      : userData?.query?.email?.split("@")[0]);

  const newMessageCount =
    chatUserList?.data?.data &&
    chatUserList?.data?.data?.reduce((acc: any, curr: any) => {
      return acc + curr?.count;
    }, 0);

  return (
    <div className="flex items-center gap-3 p-[15px]">
      <div className="relative overflow-hidden">
        <Avatar className="min-w-10 min-h-10 w-10 h-10 rounded-full ">
          <AvatarImage src="" />
          <AvatarFallback className="uppercase">
            {userName?.charAt(0) + "" + userName?.charAt(1)}
          </AvatarFallback>
        </Avatar>
        {newMessageCount > 0 && (
          <span className="absolute top-0 right-0 text-[14px] flex items-center justify-center font-abhaya font-semibold bg-[#76BC41] w-4 h-4 rounded-full text-white">
            {newMessageCount}
          </span>
        )}
      </div>
      <h3 className="lg:block hidden text-lg font-abhaya font-semibold text-black">
        Messaging
      </h3>
    </div>
  );
};

export default EmployeeMessagView;
