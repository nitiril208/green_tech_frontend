export interface EmployeeInvition {
  companyId: string;
  email: string[];
  csvUrl: string;
  invitationDetails: string;
}

export interface EmployeePayload {
  companyId: string;
  email: {
    email: string;
    fName: string;
    lName: string;
  }[];
  csvUrl: string;
  invitationDetails: string;
}

export interface EmployeeEntity {
  id: string;
  name?: null;
  email: string;
  status: string;
  phone: string;
  employeeStatus: string;
  profileImage?: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  courseAlloted?: null[] | null;
  courseAllotedCount: number;
}

export interface EmployeeProgreeResponse {
  data: Data;
  message: string;
}
export interface Data {
  employee?: EmployeeEntityResult[] | null;
}
export interface EmployeeEntityResult {
  id: number;
  name?: null;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  courseStatus: {
    completed: number;
    inprogress: number;
    totalAssigned: number;
  };
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
  courseAlloted?: CourseAllotedEntity[] | null;
  measure?: MeasureEntity[] | null;
  measureStatus: MeasureStatus;
  courseAllotedCount: number;
}
export interface CourseAllotedEntity {
  id: number;
  numberOfEmployee?: null;
  price?: null;
  request: number;
  course: Course;
  enroll: number;
  createdAt: string;
  deletedAt?: null;
  updatedAt: string;
  getFeedback: string;
  courseProgress: number;
  courseVersion: CourseVersion;
  courseReconmendedStatus: string;
}
export interface CourseVersion {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  course: Course;
  cohortGroup?: CohortGroupEntity[] | null;
  courseStatus: CourseStatus;
}
export interface Course {
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
  courseData?: CourseDataEntity[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface CohortGroupEntity {
  id: number;
  name: string;
  publish: number;
  slotStartDate: SlotStartDate;
  slotEndDate: SlotEndDate;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface SlotStartDate {
  date: string | number | string | number;
  month: string | number | string | number;
  year: string | number | string | number;
}
export interface SlotEndDate {
  date: string | number | string | number;
  month: string | number | string | number;
  year: string | number | string | number;
}
export interface CourseStatus {
  inProgress: number;
  completed: number;
  upComing: number;
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
  lastUpdeated: any;
  deletedAt?: null;
}
export interface MeasureStatus {
  delayed: number;
  ontime: number;
  completed: number;
  assigned: number;
}
