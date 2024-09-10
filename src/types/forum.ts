export interface Comment {
  createdAt: string;
  deletedAt: null;
  id: number;
  question: string;
  updatedAt: string;
}

export interface forumquestion {
  question?: string;
  userId: number;
  courseId: number;
}
export interface CommnetReply {
  reply?: string;
  userId: number;
  commentId: number;
}

export interface CommentFormData {
  data?: forumDataEntity[] | null;
  message: string;
}
export interface forumDataEntity {
  id: number;
  question: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  user: User;
  comments?: CommentsEntity[];
  like?: LikeEntity[] | null;
  unlike?: UnlikeEntity[] | null;
  module?: null;
  course: Course;
}
export interface User {
  id: number;
  name?: null;
  fname?: null;
  lname?: null;
  gender?: null;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  isVerify: number;
  lastLogout: string;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  companyDetails?: null;
  trainerDetails: TrainerDetails;
  trainerCompanyDetails: TrainerCompanyDetails;
  employeeDetails?: null;
  adminDetails?: null;
  clientDetails?: null;
}
export interface TrainerDetails {
  id: number;
  name?: string;
  surname: string;
  gender: string;
  profileImage?: string;
  ageRange: string;
  email: string;
  phone: string;
  currentHighestNFQ: string;
  employmentStatus: string;
  foreignProvider: string;
  providerAddress?: null;
  providerCity: string;
  providerCounty: string;
  attendedEvent: string;
  providerName: string;
  providerType: string;
  providerNotes: string;
  memberCompany: string;
  occupationalCategory: string;
  unemploymentTime: string;
  countyOfResidence: string;
  approved: boolean;
  editCourses: boolean;
  status: number;
  rating: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface TrainerCompanyDetails {
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
}
export interface CommentsEntity {
  id: number;
  comment?: string;
  reply?: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  user: User1;
}
export interface User1 {
  id: number;
  name: string;
  fname?: null;
  lname?: null;
  gender?: null;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  isVerify: number;
  lastLogout: string;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  companyDetails?: null;
  trainerDetails?: TrainerDetails;
  trainerCompanyDetails?: TrainerCompanyDetails;
  employeeDetails?: null;
  adminDetails?: null;
  clientDetails: ClientDetails;
}
export interface ClientDetails {
  id: number;
  name: string;
  lastName: string;
  sector: string;
  region: string;
  promoter: string;
  email: string;
  number: string;
  address: string;
  type: string;
  image: string;
  url: string;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface LikeEntity {
  id: number;
  name?: string | null;
  fname?: null;
  lname?: null;
  gender?: null;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  isVerify: number;
  lastLogout?: string | null;
  pathStatus: number;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface UnlikeEntity {
  id: number;
  name?: string | null;
  fname?: null;
  lname?: null;
  gender?: null;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  isVerify: number;
  lastLogout: string;
  pathStatus: number;
  deletedAt?: string | null;
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


// commnets 
export interface commnets {
  data?: (commnntsData)[] | null;
  message: string;
}
export interface commnntsData {
  id: number;
  comment: string;
  reply?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}


export interface ForumQuestionType {
  data: ForumQuestionData;
  message: string;
}
export interface ForumQuestionData {
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
  publishDate?: null;
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
  forumQuestions?: ForumQuestionsType[] | null;
  moduleSection: ModuleSectionType[];
}
export interface ModuleSectionType {
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
}
export interface ReadingTime {
  hour: number;
  minute: number;
  second: number;
}

export interface ForumQuestionsType {
  id: number;
  question: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  user: ForumQuestionsUser;
  comments?: CommentsType[] | null;
  like?: (null)[] | null;
  unlike?: (null)[] | null;
}
export interface ForumQuestionsUser {
  id: number;
  name: string;
  fname: string;
  lname: string;
  gender: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  isVerify: number;
  lastLogout: string;
  feedback: number;
  giveFeedback?: null;
  feedbackCreatedAt?: null;
  pathStatus: number;
  deviceTokens?: (string)[] | null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  companyDetails?: null;
  trainerDetails?: TrainerDetails | null;
  trainerCompanyDetails: TrainerCompanyDetails;
  employeeDetails?: null;
  adminDetails?: null;
  clientDetails?: null;
}
export interface TrainerCompanyDetails {
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
}
export interface CommentsType {
  id: number;
  comment: string;
  reply?: string | null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  user: ForumQuestionsUser;
}
export interface TrainerCompanyDetails {
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
}
