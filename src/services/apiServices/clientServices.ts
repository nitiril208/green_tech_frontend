import { Client } from "@/types/client";
import api from "./api";

export const fetchClient = (
  page: string,
  limit: string,
  keyword?: string,
  status?: string
) => {
  const url = `api/v1/client/list`;

  return api({
    url,
    params: {
      page,
      limit,
      keyword: keyword || "",
      status: status ? status : "",
    },
  });
};

export const fetchClientById = (id: string) => {
  const url = `api/v1/client/get/${id}`;

  return api({ url });
};

export const createClient = (data: Client) => {
  const url = `api/v1/client/create`,
    method = "post";

  return api({ url, method, data });
};

export const updateClient = (data: Client, id: string) => {
  const url = `api/v1/client/update/${id}`,
    method = "put";

  return api({ url, method, data });
};

export const deleteClient = (clientId: string) => {
  const url = `api/v1/client/delete/${clientId}`,
    method = "delete";

  return api({ url, method, data: {} });
};

export const getTargetUserby = (userId: string) => {
  const url = `api/v1/message/getTargetUserby/${userId}`;
  return api({ url });
};
