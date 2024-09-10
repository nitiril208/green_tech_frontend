export interface Trainer {
  id?: string;
  providerName: string;
  providerType: string;
  providerCity: string;
  providerCountry: string;
  surname: string;
  number: string;
  ProviderAddress: string;
  ProviderCountry: string;
  name: string;
  email: string;
  ProviderNotes: string;
}

export interface TrainersResponse {
  data?: DataEntity[] | null;
  metadata: Metadata;
  message: string;
}

export interface TrainersByIdResponse {
  data?: DataEntity;
}
export interface DataEntity {
  id: number;
  name: string;
  surname: string;
  gender: string;
  profileImage?: string | null;
  ageRange: string;
  email: string;
  phone: string;
  imageUrl: string;
  providerName: string;
  providerType: string;
  course: CourseDataResponse[];
  foreignProvider?: null;
  providerAddress?: string | null;
  providerCity: string;
  providerCounty: string;
  providerCountry: string;
  providerNotes: string;
  approved: boolean;
  assignCertificate: boolean;
  editCourses: boolean;
  status: number;
  rating: number;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface Metadata {
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export enum TrainerStatus {
  Inactive = 0,
  Active = 1,
  Pending = 2,
  IsNew = 3,
}

export interface CourseDataResponse {
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
  courseData: CourseDataEntity[];
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
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
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface TraineeCompanyDetails {
  id: number;
  companyId: any;
  name: string;
  address: any;
  county: any;
  soleTrader: any;
  sector: any;
  averageNumberOfEmployees: any;
  parentCompanyName: string;
  parentCompanyAddress: any;
  parentCompanyCounty: any;
  note: any;
  status: string;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  trainer: Trainee[];
}

export interface Trainee {
  id: number;
  name: string;
  surname: any;
  gender: any;
  profileImage: any;
  ageRange: any;
  email: string;
  phone: any;
  currentHighestNFQ: any;
  employmentStatus: string;
  foreignProvider: any;
  providerAddress?: string;
  providerCity: string;
  providerCounty: string;
  attendedEvent: any;
  providerName: string;
  providerType: any;
  providerNotes: any;
  memberCompany: any;
  occupationalCategory: any;
  unemploymentTime: any;
  countyOfResidence: any;
  approved: boolean;
  status: number;
  rating: number;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
}
