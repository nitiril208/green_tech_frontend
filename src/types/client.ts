export interface ClientResponse {
  data: Data;
  message: string;
}
export interface Data {
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
  image: string;
  url: string;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  clientDetails: ClientDetails;
}
export interface ClientDetails {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  lastLogout?: null;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface Client {
  id: string;
  email: string;
  password?: null;
  role: number;
  lastLogin?: null;
  lastLogout?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  clientDetails: ClientDetails;
  name: string;
  status?: string | undefined;
  message?: string;
}
