export interface GetChat {
  id: number;
  message: string;
  isRead: boolean;
  deletedAt?: any;
  createdAt: string;
  updatedAt: string;
  senderId: SenderId;
  images: string[] | null;
}
interface SenderId {
  id: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  lastLogout?: any;
  deletedAt?: any;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface GetChatUserList {
  id: number;
  last_msg: {
    message: string | null;
    images: string[] | null;
  };
  isRead: boolean;
  deletedAt?: any;
  createdAt: string;
  updatedAt: string;
  isOnline?: boolean;
  last_msg_time: string;
  images: string[];
  receiverId: ReceiverId;
  senderId: ReceiverId;
  name: string;
  email: string;
  count: number;
  role?: number;
}
interface ReceiverId {
  id: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  lastLogout?: any;
  deletedAt?: any;
  createdAt: string;
  updatedAt: string;
}

export interface ChatListResponse {
  data: ChatDataList;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: EnvOrRequest;
}
export interface ChatDataList {
  data?: (DataEntity)[] | null;
  message: string;
}
export interface DataEntity {
  id: number;
  name: string;
  email: string;
  count: number;
  group: boolean;
  last_msg: string;
  last_msg_time: string;
  image?: null;
  role: number;
  isOnline: boolean;
}
export interface Headers {
  "content-length": string;
  "content-type": string;
}
export interface Config {
  transitional: Transitional;
  adapter?: (string)[] | null;
  transformRequest?: (null)[] | null;
  transformResponse?: (null)[] | null;
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: EnvOrRequest;
  headers: Headers1;
  baseURL: string;
  url: string;
  method: string;
  data: string;
}
export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}
export interface EnvOrRequest {
}
export interface Headers1 {
  Accept: string;
  " Content - Type": string;
}

export interface ChatDetailsListResponse {
  data?: (ChatDetailsList)[] | null;
  message: string;
}
export interface ChatDetailsList {
  id: number;
  message: string;
  images?: (null)[] | null;
  isRead: boolean;
  status: boolean;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  senderId: SenderIdOrReceiverId;
  receiverId: SenderIdOrReceiverId;
}
export interface SenderIdOrReceiverId {
  id: number;
  name: string;
  email: string;
  userImage: UserImage | null;
}
export interface UserImage {
  id: number;
  companyId: string;
  name: string;
  address: string;
  county: string;
  soleTrader: boolean;
  sector: string;
  averageNumberOfEmployees: string;
  parentCompanyName: string;
  parentCompanyAddress: string;
  parentCompanyCounty?: null;
  note?: null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface GroupChat {
  id: number;
  images?: (null)[] | null;
  isRead?: (null)[] | null;
  message: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  senderId: SenderIdGroup;
}
export interface SenderIdGroup {
  id: number;
  name: string;
  fname: string;
  lname: string;
  gender: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  isVerify: number;
  lastLogout: string;
  feedback: number;
  giveFeedback?: null;
  feedbackCreatedAt?: null;
  pathStatus: number;
  deviceTokens?: (string)[] | null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
