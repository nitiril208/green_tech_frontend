export interface GetSingleCourseByIdType {
  data: GetSingleCourseEntity;
}
export interface GetSingleCourseEntity {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  course: CourseData;
  cohortGroup?: (CohortGroupEntity)[] | null;
}
export interface CourseData {
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
  universityAddress?: null;
  duration: string;
  price: number;
  step: number;
  tab: number;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys?: null;
  courseData?: (CourseDataEntity)[] | null;
  certificate?: CertificateType | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  nfqLeval: NfqLeval;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface CertificateType {
  id: number;
  templateName: string;
  backgroundImage: string;
  logoImage: string;
  title: string;
  employeeName: string;
  bodyText: string;
  administratorTitle: string;
  administratorSignature: string;
  instructorTitle: string;
  instructorSignature: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface NfqLeval {
  id: number;
  leval: string;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface CohortGroupEntity {
  id: number;
  slotStartDate: SlotStartDateOrSlotEndDate;
  slotEndDate: SlotStartDateOrSlotEndDate;
}
export interface SlotStartDateOrSlotEndDate {
  date: string;
  month: string;
  year: string;
}

export interface PublishCourseType {
  id: number;
  status: string;
}


export interface getSingleCourseType {
  id: number;
  version: number;
  data: CourseEntityData;
  createdAt: string;
  updatedAt: string;
  course: Course;
  cohortGroups?: (null)[] | null;
}
export interface CourseEntityData {
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits?: null;
  fetCredits?: null;
  time: number;
  isOnline: number;
  universityAddress?: null;
  duration?: null;
  price?: null;
  instituteOther?: null;
  otherInstitutionName?: null;
  description?: null;
  bannerImage: string;
  keys: string;
  courseData?: (CourseDataEntity)[] | null;
  status: string;
  providerName: ProviderNameOrClientId;
  nfqLeval: NfqLeval;
  moduleLiveSection?: (null)[] | null;
  currentVersion: CurrentVersion;
  certificate?: null;
  cohortGroup?: null;
  clientId: ProviderNameOrClientId;
  trainerCompanyId: TrainerCompanyId;
  trainerId?: null;
  deletedAt?: null;
  id: number;
  createdAt: string;
  updatedAt: string;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface ProviderNameOrClientId {
  id: number;
  name: string;
  lastName?: null;
  sector: string;
  region: string;
  promoter: string;
  email: string;
  number: string;
  address: string;
  type: string;
  image?: null;
  url: string;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface NfqLeval {
  id: number;
  leval: string;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface CurrentVersion {
  id: number;
  version: number;
  data?: null;
  createdAt: string;
  updatedAt: string;
}
export interface TrainerCompanyId {
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
  contactFirstName: string;
  providerNotes: string;
  approved: boolean;
  pillarLimit: number;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
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
  ectsCredits?: null;
  fetCredits?: null;
  time: number;
  isOnline: number;
  universityAddress?: null;
  duration?: null;
  price?: null;
  instituteOther?: null;
  otherInstitutionName?: null;
  description?: null;
  bannerImage: string;
  keys: string;
  courseData?: (CourseDataEntity)[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  nfqLeval: NfqLeval;
  certificate?: null;
  module: ModuleDataEntity[] | null;
}

export interface ModuleDataEntity {
  id: number;
  title: string;
  position: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  assessment?: (AssessmentEntity)[] | null;
  moduleSections?: (ModuleSectionsEntity)[] | null;
}
export interface AssessmentEntity {
  id: number;
  title: string;
  passingPercentage: string;
  timeBound: number;
  timeDuration: TimeDuration;
  position: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  AssessmentQuestion?: (AssessmentQuestionEntity)[] | null;
}
export interface TimeDuration {
  hours: number;
  minutes: number;
  seconds: number;
}
export interface AssessmentQuestionEntity {
  id: number;
  question: string;
  point: number;
  assessmentType?: null;
  option?: (string)[] | null;
  answer: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
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
  readingTime: ReadingTime;
  isLive: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  progressEmployee?: (null)[] | null;
  completedEmployee?: (null)[] | null;
}
export interface ReadingTime {
  hour: number;
  minute: number;
  second: number;
}


export interface CourseDiscountType {
  data?: (CourseDiscountDataEntity)[] | null;
  message: string;
}
export interface CourseDiscountDataEntity {
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
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  currentVersion: CurrentVersion;
  isDiscounted?: boolean;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface CurrentVersion {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  cohortGroup?: (CohortGroupEntity)[] | null;
}
export interface CohortGroupEntity {
  id: number;
  name: string;
  publish: number;
  slotStartDate: SlotStartDateOrSlotEndDate;
  slotEndDate: SlotStartDateOrSlotEndDate;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface SlotStartDateOrSlotEndDate {
  date: string;
  month: string;
  year: string;
}


export interface CourseByVersionType {
  data: CourseData;
  message: string;
}