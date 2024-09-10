export interface AllCourseResponse {
  data: CourseEntity[];
}

export interface CourseEntity {
  id: number;
  version: number;
  createdAt: string;
  subtitle: string;
  rating: number;
  course: {
    id: number;
    bannerImage: string;
    courseData: {
      maturityId: number;
      pillarId: number;
    }[];
    createdAt: string;
    deletedAt: string;
    description: string;
    discountApplicable: number;
    discout: number;
    duration: string;
    ectsCredits: string;
    fetCredits: string;
    freeCourse: number;
    institute: string;
    instituteOther: string;
    instituteWebsite: string;
    instituteWebsite2: string;
    isOnline: number;
    keys: {
      key: string;
    }[];
    otherInstitutionName: string;
    price: number;
    provider: number;
    status: string;
    time: number;
    title: string;
    updatedAt: string;
  };
  data: {
    id: number;
    bannerImage: string;
    courseData: {
      maturityId: number;
      pillarId: number;
    }[];
    createdAt: string;
    deletedAt: string;
    description: string;
    discountApplicable: number;
    discout: number;
    duration: string;
    ectsCredits: string;
    fetCredits: string;
    freeCourse: number;
    institute: string;
    instituteOther: string;
    instituteWebsite: string;
    instituteWebsite2: string;
    isOnline: number;
    keys: {
      key: string;
    }[];
    module: any[];
    otherInstitutionName: string;
    price: number;
    provider: number;
    status: string;
    time: number;
    title: string;
    updatedAt: string;
  };
}

export interface CourseResponse {
  data?: DataEntity[];
  message: string;
}
export interface DataEntity {
  id: number;
  version: number;
  data: Data;
  createdAt: string;
  updatedAt: string;
  course: Course;
}
export interface Data {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2?: string | null;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits: string;
  fetCredits: string;
  time: number;
  isOnline: number;
  duration?: string | null;
  price?: number | null;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys?: KeysEntity[] | null;
  courseData?: CourseDataEntity[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  module?: null[] | null;
}
export interface KeysEntity {
  key: string;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface Course {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2?: string | null;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits: string;
  fetCredits: string;
  time: number;
  isOnline: number;
  duration: string;
  price?: number | null;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys?: KeysEntity[] | null;
  courseData?: CourseDataEntity[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface AllCoursesResponse {
  data: AllCoursesResult[];
  message: string;
}
export interface AllCoursesResult {
  id: number;
  title: string;
  freeCourse: number;
  cohortGroups: number;
  discout: number;
  duration: string;
  price: number;
  description: string;
  certificate: any;
  bannerImage: string;
  courseData?: CourseDataEntity[] | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  version?: VersionEntity[] | null;
  currentVersion: CurrentVersion;
  module?: ModuleEntity[] | null;
  trainerCompanyId: TrainerCompanyId | null;
  trainerId?: TrainerId | null;
  tab: string;
  step: string;
  isOnline: number;
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
export interface VersionEntity {
  id: number;
  version: number;
  createdAt: string;
}
export interface CurrentVersion {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  mainCourse: MainCourseType;
  cohortGroup: any;
}
export interface MainCourseType {
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
  courseProgress: string;
  versionId: number;
  completedModule: number;
  totalmodules: number;
  isOnline: number;
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
  currentVersion: CurrentVersion;
  module?: ModuleEntity[] | null;
  version?: VersionEntity[] | null;
}
export interface ModuleEntity {
  id: number;
  title: string;
  position: number;
  moduleSection?: ModuleSectionEntity[] | null;
}
export interface ModuleSectionEntity {
  id: number;
  title: string;
  duration?: null;
  position: number;
  readingTime: ReadingTime;
  isLive: number;
  createdAt: string;
  updatedAt: string;
}
export interface ReadingTime {
  hour: number;
  minute: number;
  second: number;
}
export interface TrainerCompanyId {
  id: number;
  providerName: string;
}
export interface TrainerId {
  id: number;
  name: string;
}

export interface MyCourseResponse {
  data: MyCourseResult;
  message: string;
}
export interface MyCourseResult {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
  courseAlloted?: CourseAllotedEntity[] | null;
}
export interface CourseAllotedEntity {
  id: number;
  numberOfEmployee: string;
  price: number;
  request: number;
  isdiscounted: number;
  enroll: number;
  createdAt: string;
  deletedAt?: null;
  updatedAt: string;
  courseVersion: CourseVersion;
  course: MainCourseType;
  completedSections: number;
  totalSections: number;
  courseProgress: string;
  completedModule: number;
  totalmodules: number;
  courseStatus: string;
}
export interface CourseVersion {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  course: MainCourseType;
}


export interface InstitutionsListType {
  data?: InstitutionsDataEntity[] | null;
  message: string;
}
export interface InstitutionsDataEntity {
  name: string;
}

export interface CoursesNameType {
  data?: CoursesNameTypeDataEntity[] | null;
  message: string;
}
export interface CoursesNameTypeDataEntity {
  name: string;
}
