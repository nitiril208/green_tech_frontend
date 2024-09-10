import { EmployeePayload } from "@/types/Invition";
import api from "./api";

export const getMemberlist = async (
  page: string,
  limit: string,
  userId: number | null,
  keyword: string
) => {
  const url = `api/v1/employee/list`;
  const params: any = { page, limit, companyId: userId, keyword };
  const res = await api({ url, params });
  return res.data;
};

export const createEmployeeInvition = (data: EmployeePayload) => {
  const url = `api/v1/employee/send-invitation`;
  const method = "post";
  return api({ url, data, method });
};

export const getEmployeeProgress = async ({
  id,
  keyword,
  status,
}: {
  id: number;
  keyword: string;
  status: string;
}) => {
  const url = `api/v1/teamprogress/getTeamProgress?companyId=${id}&keyword=${keyword}&status=${status}`;
  const res = await api({ url });
  return res.data;
};

export const emploteeResendInvitation = async (data: { email: string, companyId: number }) => {
  const url = `api/v1/employee/resend-invitation`;
  const method = "post";
  const res = await api({ url, data, method });
  return res.data;
}