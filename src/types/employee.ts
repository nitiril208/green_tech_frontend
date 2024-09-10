export interface MeasuresItemsResponse {
  data?: DataEntity[] | null;
  metadata: Metadata;
  message: string;
}
export interface DataEntity {
  id: number;
  name?: null;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  courseAllotedCount: number;
}
export interface Metadata {
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface EmployeeActionResponse {
  data: Data;
  message: string;
}
export interface Data {
  myActionItems: MyActionItems;
  measureData?: MeasureEntity[] | null;
}
export interface MyActionItems {
  delayed: number;
  ontime: number;
  completed: number;
  assigned: number;
}
export interface MeasureEntity {
  id: number;
  measure: string;
  startDate: string;
  endDate: string;
  evidence?: null;
  iscompleted: number;
  empAssignDate?: null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
}

export interface SingleCourseEmployeeResponse {
  data: SingleCourseEmployeeResult;
  message: string;
}
export interface SingleCourseEmployeeResult {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  course: SingleCourseEmployee;
}
export interface SingleCourseEmployee {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits: string;
  fetCredits: string;
  time: number;
  isOnline: number;
  universityAddress: string;
  duration: string;
  price: number;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys: string;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  module?: ModuleEntity[] | null;
  feedBack: any;
}
export interface ModuleEntity {
  id: number;
  title: string;
  position: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  moduleSections?: ModuleSectionsEntity[] | null;
}
export interface ModuleSectionsEntity {
  id: number;
  title: string;
  information: string;
  documentType: number;
  url: string;
  uploadContent: string;
  attachment: string;
  duration?: null;
  formate?: null;
  position: number;
  liveSection: any;
  readingTime: ReadingTime;
  isLive: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  isStatus: string;
  like?: any[];
  unlike?: any[];
}
export interface ReadingTime {
  hour: number;
  minute: number;
  second: number;
}

export interface EmployeeCourse {
  myActionItems: MyActionItems;
  myCourses: MyCourses;
}
export interface MyActionItems {
  delayed: number;
  ontime: number;
  completed: number;
  assigned: number;
}
export interface MyCourses {
  totalCourses: number;
  completedCourses: number;
  inprogressCourses: number;
}

export interface AgeRangesType {
  AgeRanges?: string[] | null;
  message: string;
}

export interface EmploymentStatusType {
  employmentStatus?: string[] | null;
  message: string;
}

export interface OccupationalCategoriesType {
  occupationalCategories?: string[] | null;
  message: string;
}

export interface UnemploymentTimeType {
  unemploymentTime?: string[] | null;
  message: string;
}
