import { GetCertificate } from "@/types/certificate";
import api from "./api";

interface CertificateUpdate {
  user: string;
  templateName: string;
  backgroundImage: string;
  title: string;
  bodyText: string;
  administratorTitle: string;
  administratorSignature: string;
  instructorTitle: string;
  companyLogo1: string;
  instructorSignature: string;
  createdAt: string;
  updatedAt: string;
  message: string;
}

export const getCertificate = async () => {
  const url = `api/v1/certificate/list`;
  const res = await api({ url });
  return res.data;
};

export const certificateList = async (id: string): Promise<GetCertificate> => {
  const url = `api/v1/certificate/getByUser/${id}`;
  const res = await api({ url });
  return res.data;
};

export const certificateCourseList = async () => {
  const url = `api/v1/course/get-certificate-dropdown`;
  const res = await api({ url });
  return res.data;
};

export const getCertifications = async (id: string) => {
  const url = `api/v1/certificate/getByEmployee/${id}`;
  const res = await api({ url });
  return res.data;
};
export const fetchCourseEnroll = async (courseId: string, employeeId: number, certificateId: string): Promise<any> => {
  const url = `api/v1/course/get-enrolled-course/${courseId}/${employeeId}`;
  const params: any = {};
  if (certificateId) {
    params["certificateId"] = certificateId;
  }
  const res = await api({ url, params });
  return res.data;
};

export const fetchcertificate = async (id: string) => {
  const url = `api/v1/certificate/get/${id}`
  const res = await api({ url });
  return res.data;
}

export const Updatecertificate = ({
  data,
  id,
}: {
  data: CertificateUpdate | any;
  id: string;
}) => {
  const url = `api/v1/certificate/update/${id}`,
    method = "put";
  return api({ url, method, data });
};

export const IssuedCertificateList = async ({
  id,
  page,
  search,
}: {
  id: number;
  page: number;
  search: string;
}) => {
  const url = `api/v1/certificate/get-employee/${id}?page=${page}&limit=10&keyword=${search}`;
  const res = await api({ url });
  return res.data;
};

export const deleteCertificate = async (id: number) => {
  const url = `api/v1/certificate/delete/${id}`;
  const res = await api({ url, method: "delete" });
  return res.data;
};

export const allocateCertificate = async (data: any) => {
  const url = `api/v1/certificate/allocate-certificate`;
  const res = await api({ url, method: "put", data });
  return res.data;
}

export const deleteAllocateCertificate = async (id: number) => {
  const url = `api/v1/certificate/allocate-delete/${id}`;
  const res = await api({ url, method: "delete" });
  return res.data;
}