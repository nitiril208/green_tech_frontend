export interface AllocatedTraineeListResponse {
  data: Data;
  message: string;
}
export interface Data {
  id: number;
  providerName: string;
  providerType: string;
  providerCity: string;
  providerCounty: string;
  contactSurname: string;
  contactTelephone: string;
  foreignProvider: boolean;
  providerAddress: string;
  providerCountry: string;
  contactFirstName?: null;
  providerNotes: string;
  approved: boolean;
  pillarLimit: number;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  trainer?: TrainerEntity[] | null;
}
export interface TrainerEntity {
  id: number;
  name?: string | null;
  surname?: string | null;
  gender?: null;
  profileImage?: null;
  ageRange?: null;
  email: string;
  phone?: null;
  currentHighestNFQ?: null;
  employmentStatus: string;
  foreignProvider?: null;
  providerAddress?: null;
  providerCity?: null;
  providerCounty?: null;
  attendedEvent?: null;
  providerName?: null;
  providerType?: null;
  providerNotes?: null;
  memberCompany?: null;
  occupationalCategory?: null;
  unemploymentTime?: null;
  countyOfResidence?: null;
  approved: boolean;
  editCourses: boolean;
  assignCertificate: boolean;
  status: number;
  rating: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  courseAllocated?: (CourseAllocatedEntity | null)[] | null;
  existCourseAllocated: boolean;
}
export interface CourseAllocatedEntity {
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
