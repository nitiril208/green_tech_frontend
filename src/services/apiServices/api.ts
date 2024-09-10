import { ErrorData, ErrorType } from "@/types/Errors";
import axios, { AxiosError } from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AxiosParams {
  baseURL?: string;
  headers?: any;
  method?: "get" | "post" | "patch" | "put" | "delete";
  data?: any;
  params?: { [key: string]: string | number };
  url: string;
  isFormData?: boolean;
  progressCallback?: (val:any) => void
}

const api = ({
  baseURL = BASE_URL,
  headers = {},
  method = "get",
  data = {},
  params,
  url,
  isFormData = false,
  progressCallback = () => {},
}: AxiosParams) => {
  const instance = axios.create({
    baseURL,
  });

  const config = {
    url,
    method,
    data,
    params,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    onUploadProgress: (progressEvent: any) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      progressCallback(percentCompleted)
    }
  };

  if (isFormData) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error: AxiosError) => {
      const err: ErrorType = {
        code: error.response?.status || 0,
        data: error.response?.data as ErrorData,
      };
      return Promise.reject(err);
    }
  );

  return instance.request(config);
};

export default api;
