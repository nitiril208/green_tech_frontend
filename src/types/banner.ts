import { Course } from "./course";

export interface GetHomeBannerResponse {
  data?: DataEntity[];
  message: string;
  clientData: boolean;
}
export interface DataEntity {
  id: number;
  banner: string;
  title: string;
  content: string;
  primaryButtonTitle: string;
  primaryButtonUrl: string;
  secondaryButtonTitle: string;
  secondaryButtonUrl: string;
  status: string;
  mobileBanner: "string"
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface HomeCourseSlidersResponse {
  data?: DataEntity[];
  message: string;
  clientData: boolean;
}
export interface DataEntity {
  id: number;
  courseType: string;
  courseTitle: Course;
  content: string;
  courseImage: string;
  buttonTitle: string;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
