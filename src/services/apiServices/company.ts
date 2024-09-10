import { CompanyResponse } from "@/pages/CompanyRegister";
import { Company, ProviderTypesType, TrainerByEmailType } from "@/types/Company";
import api from "./api";

export const createCompany = (data: { email: string, client: string }) => {
  const url = `api/v1/user/register-company`,
    method = "post";

  return api({ url, method, data });
};

export const updateCompany = (data: Company) => {
  const url = `api/v1/user/update-company`,
    method = "put";
  return api({ url, method, data });
};

export const getOneCompany = (id: string) => {
  const url = `api/v1/company/get/${id}`,
    method = "get";
  return api({ url, method });
};

export const checkOTP = (data: {
  otp: string;
  client: string;
  name: string;
  email: string;
  password: string;
  cpassword: string;
}) => {
  const url = `api/v1/user/check-otp`,
    method = "post";
  return api({ url, method, data });
};

export const getCompanyDetailsById = async ({ company_num }: { company_num: number }): Promise<CompanyResponse> => {
  const url = `api/v1/thirdparty/getCompany?companyNumber=${company_num}`;
  const method = "post";
  const res = await api({ url, method, data: {} });
  return res.data
};

export const getCountry = async () => {
  const url = `api/v1/thirdparty/getcountry`,
    method = "get";
  const res = await api({ url, method });
  return res.data
};

export const fetchProviderTypes = async (): Promise<ProviderTypesType> => {
  const url = `api/v1/trainer-company/getProviderTypes`;
  const res = await api({ url });
  return res.data
};

export const fetchTrainerByEmailDataQuery = async (email: string): Promise<TrainerByEmailType> => {
  const url = `api/v1/trainer/get-trainerByEmail?email=${email}`;
  const res = await api({ url });
  return res.data
};