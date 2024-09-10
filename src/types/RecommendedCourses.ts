// export interface RecommendedCourses {
//   id: number;
//   title: string;
//   institute: string;
//   instituteWebsite: string;
//   instituteWebsite2: string;
//   freeCourse: number;
//   discout: number;
//   discountApplicable: number;
//   provider: number;
//   ectsCredits: string;
//   fetCredits: string;
//   time: CourseTime;
//   isOnline: IsOnline;
//   duration: string;
//   price: number;
//   instituteOther: string;
//   otherInstitutionName: string;
//   description: string;
//   bannerImage: string;
//   courses?: RecommendedCourses[];
//   avatars: string[];
//   page: number;
// }

export enum CourseTime {
  FullTime = 0,
  PartTime = 1,
}
export enum IsOnline {
  Online = 0,
  InPerson = 1,
  Hybrid = 2,
}

export interface RecommendedCourseResponse {
  data?: RecommendedCourses[];
  pagination: Pagination;
  message: string;
}
export interface RecommendedCourses {
  data: any;
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  universityAddress: string;
  freeCourse: number;
  enrolledStatus: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits: string;
  fetCredits: string;
  time: number;
  isOnline: number;
  inquire: boolean;
  trainerCompanyId: any;
  trainerId: any;
  duration: string;
  price: number;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys?: null;
  courseData?: CourseDataEntity[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  enrolled: boolean;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
  fetchMaturity: FetchMaturity;
  fetchPillar: FetchPillar;
}
export interface FetchMaturity {
  id: number;
  maturityLevelName: string;
  rangeStart: number;
  rangeEnd: number;
  color: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface FetchPillar {
  id: number;
  pillarName: string;
  checked: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface Pagination {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  nextPage?: null;
  previousPage?: null;
}
