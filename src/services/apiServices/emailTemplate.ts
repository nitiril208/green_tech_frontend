import api from "./api";

export const fetchEmails = (targetid:number) => {
  const url = `api/v1/email-template/list`;
  let params: any = {}
  if(targetid){
    params["targetid"] = targetid
  }
  return api({ url, params });
};

export const getOneEmailTemplate = (id: string) => {
  const url = `api/v1/email-template/get/${id}`;
  return api({ url });
};

export const createEmails = (data: any) => {
  const url = `api/v1/email-template/create`;

  return api({ url, method: "post", data });
};

export const updateEmails = (data: any, id: string) => {
  const url = `api/v1/email-template/update/${id}`;
  return api({ url, method: "put", data });
};

export const deleteEmails = (id: string) => {
  const url = `api/v1/email-template/delete/${id}`;

  return api({ url, method: "delete", data: {} });
};

export const fetchCompanyOrTrainerCompany = async (
  id: string,
  role: string
) => {
  const url = `api/v1/message/getCompanyOrTrainerCompany?clientId=${id}&role=${role}`;
  return await api({ url });
};
