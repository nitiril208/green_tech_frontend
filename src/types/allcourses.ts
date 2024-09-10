export interface AllCourse {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: freeCource;
  discout: Discout;
  courseReconmendedStatus: string;
  discountApplicable: number;
  provider: Provider;
  ectsCredits: string;
  fetCredits: string;
  time: CourseTime;
  isOnline: IsOnline;
  duration: string;
  price: number;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  page: number;
  cohortGroups: CohortData[],
  courseAlloted: courseAlloted[];
  currentVersion: CurrentVersionType;
  enrolled: boolean;
  courseData: [
    {
      pillarId: number;
      maturityId: number;
      fetchMaturity: {
        id: number;
        maturityLevelName: string;
        rangeStart: number;
        rangeEnd: number;
        color: string;
      };
      fetchPillar: {
        id: number;
        pillarName: string;
        checked: number;
      };
    }
  ];
  trainerCompanyId: {
    id: number;
  };
  trainerId: {
    id: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CohortData {
  id: number;
  name: string;
  slotEndDate: {
    date: string;
    month: string;
    year: string;
  };
  slotStartDate: {
    date: string;
    month: string;
    year: string;
  };
}

export interface CurrentVersionType {
  id: number;
  version: number;
  data: Data;
  createdAt: string;
  updatedAt: string;
}
export interface Data {
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
  courseData?: (null)[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  nfqLeval: string;
  certificate: string;
}

export interface courseAlloted {
  id: number;
  request: number;
  enroll: number;
  createdAt: string;
  updatedAt: string;
  user: UserData;
  course: {
    id: number;
  }
}
export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  lastLogout: string;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}


// export enum CourseStatus {
//   Published = "PUBLISHED",
//   Hold = "HOLD",
// }

export enum freeCource {
  true = 1,
  false = 0,
}

export enum CourseTime {
  FullTime = 0,
  PartTime = 1,
}
export enum IsOnline {
  Online = 0,
  InPerson = 1,
  Hybrid = 2,
  Major = 3,
  Offline = 4,
}

export enum Provider {
  true = 1,
  false = 0,
}
export enum Discout {
  true = 1,
  false = 0,
}

export interface Pillarcourse {
  id: number;
  pillarName: string;
}

export interface CoursePublishAdminClientData {
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
  certificate: string | null;
  time: number;
  isOnline: number;
  universityAddress: string;
  duration: string;
  price: number;
  instituteOther: string;
  otherInstitutionName: string | null;
  description: string;
  bannerImage: string;
  keys: string;
  courseData: Array<{
    pillarId: number;
    maturityId: number;
    fetchMaturity: FetchMaturity;
    fetchPillar: FetchPillar;
  }>;
  status: string;
  publishDate: string;
  step: string;
  tab: string;
  creationCompleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
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