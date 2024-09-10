import api from "./api";

export const fetchAllocatedCourseById = async (enrollId: number) => {
  const url = `api/v1/course/course-enrollmentById/${enrollId}`;

  const res = await api({ url });
  return res.data;
};

export const fetchAllocatedCourse = async (id: number, filter?: string, client?: string) => {
  const url = `api/v1/course/course-enrollment/${id}`;
  const params: any = {};
  if (filter) {
    params["filter"] = filter;
  }
  if (client) {
    params["client"] = client;
  }
  const res = await api({ url, params });
  return res.data;
};

export const allocateCourse = async (data: {
  companyId: number;
  enrollId: number;
  employeeId: number[];
}) => {
  const url = `api/v1/course/enroll`;
  const res = await api({ url, method: "post", data });
  return res.data;
};

export const trainerAllocateCourse = async (data: {
  courseId: number;
  traineeId: number[];
}) => {
  const url = `api/v1/trainer-company/allocatecourse`;
  const res = await api({ url, method: "post", data });
  return res.data;
};
