import api from "./api";

export const registerTrainer = (data: any) => {
  const url = `api/v1/user/register-trainer-company`;
  return api({ url, data, method: "post" });
};

export const getTrainer = async ({
  id,
  keyword,
  limit,
  page,
  status = "",
}: {
  id: string;
  keyword: string;
  status?: string;
  limit: number;
  page: number;
}) => {
  const url = `api/v1/trainer/list?trainerCompanyId=${id}&keyword=${keyword}&limit=${limit}&page=${page}&status=${status}`;
  const response = await api({ url });
  return response.data;
};

export const deleteTrainerInvitation = async (id: number) => {
  const url = `api/v1/trainer/delete/${id}?status=pending`;
  return api({ url, method: "delete" });
};

export const sendOtp = async ({ email }: { email: string }) => {
  const url = `api/v1/user/send-otp`;
  const response = await api({ url, data: { email }, method: "post" });
  return response.data;
};

export const getTrainerById = async ({ id }: { id: string }) => {
  const url = `api/v1/trainer/get/${id}`;
  const response = await api({ url });
  return response.data;
};

export const getTrainerByCompanyId = async ({
  id,
  courseId,
}: {
  id: string;
  courseId: string;
}) => {
  const url = `api/v1/trainer/get-trainers/${id}/?courseId=${courseId}`;
  const response = await api({ url });
  return response.data;
};

export const updateTrainerStatusById = async ({
  id,
  data,
}: {
  id: string;
  data: {
    status?: string;
    approved: string;
    editCourses?: string;
    assignCertificate?: string;
  };
}) => {
  const url = `api/v1/trainer/update-status/${id}`;
  const response = await api({ url, data, method: "put" });
  return response.data;
};

export const trainerInvitation = async (data: {
  email: string[];
  invitationDetails: string;
  TrainerCompanyId?: number;
  baseUrl?: string;
}) => {
  const url = `api/v1/trainer-company/send-invitation`;
  const response = await api({ url, data, method: "post" });
  return response.data;
};
export const trainerCreate = async (data: any) => {
  const url = `api/v1/trainer/create`;
  const response = await api({ url, data, method: "post" });
  return response.data;
};

export const trainerUpdate = async (data: any) => {
  const url = `api/v1/trainer/updateTrainer`;
  const response = await api({ url, data, method: "put" });
  return response.data;
};

export const trainerDetailsUpdate = async ({
  data,
  id,
}: {
  data: any;
  id: string;
}) => {
  const url = `api/v1/trainer/update/${id}`;
  const response = await api({ url, data, method: "put" });
  return response.data;
};

// export const getTraineeCompany = async (id: number) => {
//   const url = `api/v1/livesessions/get/${id}`,
//     method = "get";
//   const res = await api({ url, method });
//   return res.data;
// };

export const getTraineeCompany = async (
  id: number,
  courseId: number,
  sessionId: string
) => {
  console.log("courseId", courseId);

  const url = `api/v1/livesessions/company-trainerCompany/${id}`,
    method = "get";
  const params: any = {};
  if (courseId) {
    params["courseId"] = courseId;
  }
  if (sessionId) {
    params["sessionId"] = sessionId;
  }
  const res = await api({ url, method, params });
  return res.data;
};

export const getTrainee = async (
  trainerCompanyID: number,
  companyId: number,
  searchQuery: string,
  sessionId: string
) => {
  const url = `api/v1/livesessions/employee-trainerCompany/${trainerCompanyID}`;
  const params: any = {};

  if (companyId) {
    params["companyId"] = companyId;
  }
  if (searchQuery) {
    params["keyword"] = searchQuery;
  }
  if (sessionId) {
    params["sessionId"] = sessionId;
  }
  const res = await api({ url, params });
  return res.data;
};

export const registerTrainee = async ({
  email,
  data,
}: {
  email: string;
  data: any;
}) => {
  const url = `api/v1/trainer/update-email/${email}`;
  const method = "put";
  const res = await api({ url, data, method });
  return res.data;
};

export const resendInvitation = async (data: {
  email: string;
  TrainerCompanyId: number;
  baseUrl: string;
}) => {
  const url = `api/v1/trainer-company/resend-invitation`;
  const method = "post";
  const res = await api({ url, data, method });
  return res.data;
};
