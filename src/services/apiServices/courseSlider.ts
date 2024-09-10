import api from "./api";

export const fetchDataByClientwise = (clienturl: string) => {
  const url = `api/v1/client/get_by_url?url=${clienturl}`;
  return api({ url });
};

export const CourseSlider = () => {
  const url = `api/v1/course-slider/list`;
  return api({ url });
};

export const clientwiseCourseSlider = (id: string) => {
  const url = `api/v1/course-slider/list?clientId=${id}`;
  return api({ url });
};

export const getCourseSlider = async (id: string, type: string) => {
  const url = `api/v1/course-slider/getDeshboardcoursesSlider?clientId=${id}&status=${type}`;
  const res = await api({ url });
  return res.data;
};

export const fetchSingleCourse = async (id: string, companyId?: string, empId?: string) => {
  const url = `api/v1/course/get/${id}?empid=${empId}`;
  const params = {
    companyId: companyId || "",
  };
  const res = await api({ url, params });
  return res.data;
};

export const getEmployeeSingeCourse = async ({
  courseId,
  userId,
  companyId,
}: {
  courseId: string;
  userId: string;
  companyId?: string;
}) => {
  const url = `api/v1/course/get-by-employee/${courseId}/${userId}`;
  const params = {
    companyId: companyId || "",
  };

  const res = await api({ url, params });
  return res.data;
};

export const updateEmployeeWiseCourseStatus = async ({
  courseId,
  data,
}: {
  courseId: number;
  data: {
    employeeid: number;
    status: number;
    trainerCompany?: number;
    user?: number;
    isTrainerCompany?: boolean;
  };
}) => {
  const url = `api/v1/course/module/section/status/${courseId}`;
  const method = "put";
  return api({ url, method, data });
};

export const likeDislikeAction = async ({
  sectionId,
  data,
}: {
  sectionId: number;
  data: { userId: number; isLike: boolean };
}) => {
  const url = `api/v1/course/module/section/like-dislike/${sectionId}`;
  const method = "post";
  return api({ url, method, data });
};
