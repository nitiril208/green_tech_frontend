import api from "./api";

export const fetchTargetAudience = () => {
  const url = `api/v1/target-audience/list`;
  return api({ url });
};

export const fetchTargetAudienceList = (targetid: string) => {
  const url = `api/v1/email-template/list?targetid=${targetid}`;
  return api({ url });
};
