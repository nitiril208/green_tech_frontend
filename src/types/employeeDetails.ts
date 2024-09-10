export interface EmployeeDetailsResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  shareFeedback: boolean;
  retakeSelfAssessment: boolean;
  employeeDetails: EmployeeDetails;
}
export interface EmployeeDetails {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  lastLogin?: null;
  isVerify: number;
  lastLogout?: null;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeResult {
  data?: EmployeeResponse[];
  metadata: {
    currentPage: number;
    totalCount: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface EmployeeResponse {
  id: number;
  name?: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: string;
  deletedAt?: Date;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
}
