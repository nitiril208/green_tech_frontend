import api from "./api";

export const fetchAllCourse = (
  pillerId: string,
  search: string,
  client: string,
  userId: string,
  companyId: string
) => {
  // const url = `api/v1/course/list?keyword=${search}&pillarid=${pillerId}`;
  const url = `api/v1/course/list`;
  const params: any = {};

  if (search) {
    params["keyword"] = search;
  }
  if (pillerId) {
    params["pillarid"] = pillerId;
  }
  if (client) {
    params["client"] = client;
  }
  if (userId) {
    params["user"] = userId;
  }
  if (companyId) {
    params["companyId"] = companyId;
  }

  return api({ url, params });
};

export const fetchPillar = (id: string) => {
  const url = `api/v1/pillar/list/?clientId=${id}`;
  return api({ url });
};

export const fetchPillarCourse = (id: number) => {
  const url = `api/v1/course/list?page=1&limit=10&keyword=&pillarid=${id}`;
  return api({ url });
};

export const courseStatusUpdate = async (id: number) => {
  const url = `api/v1/course/status/update/${id}`;
  const res = await api({ url, method: "post" });
  return res.data;
};
