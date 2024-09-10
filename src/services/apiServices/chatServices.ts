import { ChatDataList, ChatDetailsListResponse, GroupChat } from "@/types/Chat";
import { AxiosResponse } from "axios";
import api from "./api";

export const fetchChatUserList = (
  id: string
): Promise<AxiosResponse<ChatDataList>> => {
  const url = `api/v1/message/list/${id}`;
  return api({ url });
};

export const fetchChat = (
  userId1: string | number,
  userId2: string | number
): Promise<AxiosResponse<ChatDetailsListResponse>> => {
  const url = `api/v1/message/get?userId1=${userId1}&userId2=${userId2}`;
  return api({ url });
};
export const fetchGroupChat = async (
  id: string | number
): Promise<AxiosResponse<GroupChat>> => {
  const url = `api/v1/group/message/get/${id}`;
  const res = await api({ url });
  return res.data;
};

export const sendGroupMessage = async (data: any) => {
  const url = `api/v1/group/message/send`;
  const res = await api({ url, method: "post", data });
  return res?.data;
};

export const sendMessage = (data: any) => {
  const url = `api/v1/message/send`;
  return api({ url, method: "post", data });
};

export const updateMessage = (data: any) => {
  const url = `api/v1/message/update`,
    method = "put";

  return api({ url, method, data });
};
