export interface ResetPasswordType {
  status: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
  token?: string;
}

export interface UserData {
  user: User;
}
export interface User {
  UserId: number;
  clientId: number;
  targetAudienceId: string;
  CompanyId: number;
}
