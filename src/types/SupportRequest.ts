export interface SupportRequest {
  id: string,
  updatedate: string,
  requestor: string,
  status: string,
  subject: string,
  country: string,
  assign: string,
  Priority: string,
  openbyname: string,
}

export interface SubmitType {
  id: string,
  item: {
    assignTo: string,
    ticketStatus: string,
    details: string
  }
}

export interface SubmitPayload {
  assignTo: number,
  priority: string,
  type: string,
  subject: string,
  description: string,
  documentUrl: string,
  videoUrl: string,
  openBy: number,
  email: string
}

export interface SelfAssessmentType {
  pillarid: number;
  pillarname: string;
  totalmaxpoint: number;
  totalpoints: number;
  totalquestionsavailable: number;
  totalquestionsattempted: number;
}


export interface SupportTicketCompanyType {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  lastLogin?: null;
  lastLogout?: null;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  companyDetails: CompanyDetails;
  trainerCompanyDetails: TrainerCompanyDetails;
  adminDetails: AdminDetails;
  clientDetails: ClientDetails;
}
export interface CompanyDetails {
  id: number;
  companyId?: null;
  name: string;
  address?: null;
  county?: null;
  soleTrader?: null;
  sector?: null;
  averageNumberOfEmployees?: null;
  parentCompanyName?: null;
  parentCompanyAddress?: null;
  parentCompanyCounty?: null;
  note?: null;
  status: string;
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
export interface AdminDetails {
  id: number;
  firstName: string;
  lastName: string;
  number: string;
  image: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface ClientDetails {
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
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}


export interface SupportTicketListType {
  data: SupportTicketListData
}
export interface SupportTicketListData {
  data?: (DataEntity)[] | null;
  dataAnalytics: DataAnalytics;
  metadata: Metadata;
  message: string;
}
export interface DataEntity {
  id: number;
  email: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  reply: string;
  documentUrl: string;
  videoUrl: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  openBy: OpenByOrAssignTo;
  assignTo: OpenByOrAssignTo;
}
export interface OpenByOrAssignTo {
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
}
export interface DataAnalytics {
  totalTickets: number;
  responded: number;
  resolved: number;
  pending: number;
}
export interface Metadata {
  totalItems: number;
  currentPage: number;
  totalPages: number;
}



export interface AssigToUserListType {
  data?: AssigToUserListDataEntity[] | null;
  message: string;
}
export interface AssigToUserListDataEntity {
  id: number;
  name?: string | null;
  email?: string | null;
  status: string;
  employeeStatus?: string | null;
  clientDetails: any;
  profileImage?: string | null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  editActionItem?: boolean | null;
  retakeSelfAssessment?: boolean | null;
  shareFeedback?: boolean | null;
  userDetails: UserDetails;
  companyId?: string | null;
  address?: string | null;
  county?: string | null;
  soleTrader?: boolean | null;
  sector?: string | null;
  averageNumberOfEmployees?: string | null;
  parentCompanyName?: string | null;
  parentCompanyAddress?: string | null;
  parentCompanyCounty?: null;
  note?: null;
}
export interface UserDetails {
  id: number;
  name?: string | null;
  fname?: string | null;
  lname?: string | null;
  gender?: string | null;
  email: string;
  password: string;
  role: number;
  lastLogin?: string | null;
  isVerify: number;
  lastLogout?: string | null;
  pathStatus: number;
  deviceTokens?: (null)[] | null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
