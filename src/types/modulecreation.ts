export interface ModuleCreation {
  moduleTitle: string;
  section: SectionCreation[];
}

export interface SectionCreation {
  sectionTitle: string;
  information: string;
  uploadContentType: number | null | undefined;
  uploadedContentUrl: string;
  readingTime: {
    hour: number;
    minute: number;
    second: number;
  };
  youtubeUrl: string;
  uploadDocument: string;
  isLive: boolean;
  livesessionDuration: {
    hour: number;
    minute: number;
    second: number;
  };
}

export enum documentType {
  Word = 1,
  Exel = 2,
  Pdf = 3,
  Video = 4,
}

export interface ModuleStatusResponse {
  data: Data;
  moduleStatuses?: (ModuleStatusesEntity)[] | null;
  message: string;
}
export interface Data {
  id: number;
  numberOfEmployee: string;
  price: number;
  request: number;
  isdiscounted: number;
  enroll: number;
  createdAt: string;
  deletedAt?: null;
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
  courseData?: (CourseDataEntity)[] | null;
  status: string;
  step: string;
  tab: string;
  creationCompleted: boolean;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  module?: (ModuleEntity)[] | null;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface ModuleEntity {
  id: number;
  title: string;
  position: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  moduleSection?: (ModuleSectionEntity)[] | null;
}
export interface ModuleSectionEntity {
  id: number;
  title: string;
  information: string;
  documentType: number;
  url: string;
  uploadContent: string;
  attachment: string;
  duration?: string | null;
  formate?: null;
  position: number;
  readingTime: ReadingTime;
  isLive: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  completedEmployee?: (CompletedEmployeeEntity)[] | null;
  progressEmployee?: (null)[] | null;
}
export interface ReadingTime {
  hour: number;
  minute: number;
  second: number;
}
export interface CompletedEmployeeEntity {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  gender?: null;
  ageRange?: null;
  phone?: null;
  nFQ?: null;
  employmentStatus?: null;
  memberCompany?: null;
  occupationalCategory?: null;
  unemploymentTime?: null;
  countyOfResidence?: null;
  attendedEvent?: null;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
}
export interface ModuleStatusesEntity {
  status: string;
  title: string;
  id: number;
}
