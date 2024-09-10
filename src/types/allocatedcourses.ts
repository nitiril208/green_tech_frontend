export interface AllocatedCourse {
  id: number;
  request: number;
  enroll: number;
  courses?: AllocatedCourse[];
  course: {
    id: number;
    title: string;
    institute: string;
    instituteWebsite: string;
    instituteWebsite2: string;
    freeCourse: number;
    bannerImage: string;
    description: string;
    discout: number;
    discountApplicable: number;
    provider: number;
    ectsCredits: string;
    fetCredits: string;
    time: CourseTime;
    isOnline: IsOnline;
    duration: string;
    price: number;
    instituteOther: string;
    otherInstitutionName: string;
    company: Company;
  };
}

export interface Company {
  id: number;
  companyId?: null;
  name: string;
  address: string;
  county: string;
  soleTrader: boolean;
  sector: string;
  averageNumberOfEmployees: string;
  parentCompanyName: string;
  parentCompanyAddress: string;
  parentCompanyCounty: string;
  note?: null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  employee: Employee[];
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}


export enum CourseTime {
  FullTime = 0,
  PartTime = 1,
}
export enum IsOnline {
  Online = 0, InPerson = 1, Hybrid = 2, Major = 3
}

export interface EnrollmentRequestsResponse {
  data: Data;
  message: string;
}
export interface Data {
  id: number;
  companyId: string;
  name: string;
  address: string;
  county: string;
  soleTrader: boolean;
  sector: string;
  averageNumberOfEmployees: string;
  parentCompanyName: string;
  parentCompanyAddress: string;
  parentCompanyCounty: string;
  note?: null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  courseAlloted?: (CourseAllotedEntity)[] | null;
  employee?: (EmployeeEntity)[] | null;
}
export interface CourseAllotedEntity {
  id: number;
  request: number;
  enroll: number;
  createdAt: string;
  updatedAt: string;
  courseReconmendedStatus: string;
  course: Course;
  numberOfEmployee: string;
  employee: EmployeeEntity[];
}
export interface CourseVersion {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  course: Course;
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
  ectsCredits?: string;
  fetCredits?: string;
  time: number;
  isOnline: number;
  universityAddress?: string;
  duration?: string;
  price?: string;
  instituteOther?: string;
  otherInstitutionName?: string;
  description?: string;
  bannerImage?: string;
  keys?: string;
  courseData: any;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  avgRating?: any
}
export interface EmployeeEntity {
  id: number;
  name?: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

