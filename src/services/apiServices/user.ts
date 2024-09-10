import api from "./api";

export const getUserDetails = async (id: string) => {
  const url = `api/v1/user/profile/${id}`;
  const res = await api({ url });
  return res.data;
};

export const updateUserDetails = async (data: any) => {
  const url = `api/v1/user/profile/update`;
  const res = await api({ url, data, method: "put" });
  return res.data;
};

export const changePassword = async (data: any) => {
  const url = `api/v1/user/change-password`;
  const res = await api({ url, data, method: "post" });
  return res.data;
};
