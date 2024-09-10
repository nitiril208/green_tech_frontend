import { enroll, EnrolledCoursesType, EvaluteType } from "@/types/enroll";
import api from "./api";
import { CourseDiscountType } from "@/types/course";

export const fetchEnroll = (data:enroll) => {
  const url = `api/v1/course/course-Enroll`;
  const method = "post";
  return api({ url, method, data });
};

export const fetchEnrollmentAccepted = async (id: string) : Promise<EnrolledCoursesType | any> => {
  const url = `api/v1/course/course-enrollment-Accepted/${id}`;
  const res = await api({ url });
  return res?.data
};

export const fetchCourseDiscountEnroll = async (id?: number | null) : Promise<CourseDiscountType> => {
  const url = `api/v1/course/courseDiscount`;
  let params:any = {};
  if(id){
    params["courseId"] = id;
  }
  const res = await api({ url, params });
  return res?.data
};

export const fetchEvaluteData = async (courseId: number, cohortId: number) : Promise<EvaluteType> => {
  const url = `api/v1/evalute/get/${courseId}/${cohortId}`;
  const res = await api({ url });
  return res?.data
};

export const createEvaluationScore = (data: any) => {
  const url = `api/v1/evaluationScore/create`;
  return api({ url, data, method: "post" });
};

export const fetchEnrollmentAcceptedFilterData = async (trainercompnyId: number, versionId: number) : Promise<any> => {
  const url = `api/v1/course/course-enrollment-Accepted-filter/${trainercompnyId}/${versionId}`;
  const res = await api({ url });
  return res?.data
};