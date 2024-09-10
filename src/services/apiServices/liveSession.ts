import api from "./api";

// export const scheduleLiveSession = ({ data, id }: any) => {
//   const url = `api/v1/livesessions/update/${id}`;

//   return api({ url, data, method: "put" });
// };

export const scheduleLiveSession = ({ data, id }: any) => {
  const url = `api/v1/livesessions/liveSessionUpdate/${id}`;

  return api({ url, data, method: "put" });
};
export const liveSessionUpdate = ({ data, id }: any) => {
  const url = `api/v1/course/module/section/update/${id}`;

  return api({ url, data, method: "put" });
};

export const createLiveSession = ({ data }: any) => {
  const url = `api/v1/livesessions/create`;

  return api({ url, data, method: "post" });
};

export const scheduleUpdateLiveSession = ({ data, id }: any) => {
  const url = `api/v1/livesessions/updateZoomPortal/${id}`;
  return api({ url, data, method: "put" });
};

export const createLiveSection = async (data: any) => {
  const url = `api/v1/course/module/section/create`,
    method = "post";

  const res = await api({ url, method, data: [data] });
  return res;
};

export const getAllLiveSession = (trainerCompanyId: number, para: string) => {
  const url = `api/v1/livesessions/list`;
  const params: any = {};

  if (trainerCompanyId) {
    params[para] = trainerCompanyId;
  }
  return api({ url, params });
};

export const getLiveSession = (id: string) => {
  const url = `api/v1/course/get/${id}`;
  return api({ url });
};

export const deleteLiveSessions = (id: string) => {
  const url = `api/v1/livesessions/liveSessionDelete/${id}`,
    method = "delete";

  return api({ url, method, data: {} });
};

export const getLiveSessionById = (id: string) => {
  const url = `api/v1/livesessions/get/${id}`;
  return api({ url });
};

export const getZoomSetting = async () => {
  const url = `api/v1/globalsetting/zoom-permission`
  const res = await api({ url })
  return res.data
}