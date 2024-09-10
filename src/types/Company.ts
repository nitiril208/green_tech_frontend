export interface Company {
    id?: string,
    name: string,
    email: string,
    password: string,
    cpassword: string,
    address: string,
    county: string,
    averageNumberOfEmployees: string,
    sector: string,
    parentCompanyAddress: string,
    ProviderCountry: string,
    parentCompanyName: string,
    parentCompanyCounty: string,
    soleTrader: boolean,
    companyId: number
}

export interface CountryResponse {
    data?: (DataEntity)[];
    message: string;
}
export interface DataEntity {
    name: string;
    code: string;
}

export interface ProviderTypesType {
    providerTypes?: (string)[] | null;
    message: string;
  }
  
export interface TrainerByEmailType {
    data: Data;
    message: string;
}
export interface Data {
    id: number;
    name?: null;
    fname?: null;
    lname?: null;
    gender?: null;
    email: string;
    password?: null;
    role: number;
    lastLogin?: null;
    isVerify: number;
    lastLogout?: null;
    feedback: number;
    giveFeedback?: null;
    feedbackCreatedAt?: null;
    pathStatus: number;
    deviceTokens?: (null)[] | null;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    trainerDetails: TrainerDetails;
}
export interface TrainerDetails {
    id: number;
    name: string;
    surname: string;
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
    providerCountry?: null;
    contactFirstName?: null;
    contactSurname?: null;
    contactTelephone?: null;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    trainerCompany: TrainerCompanyType;
}
export interface TrainerCompanyType {
    id: number;
    providerName: string;
    providerType: string;
    providerCity: string;
    providerCounty?: null;
    contactSurname: string;
    contactTelephone: string;
    foreignProvider: boolean;
    providerAddress: string;
    providerCountry: string;
    contactFirstName: string;
    providerNotes: string;
    approved: boolean;
    pillarLimit: string;
    status: string;
    profileImage?: null;
    videoDonferencingAccess: number;
    LMSaccess: number;
    certificationAccess: number;
    maxTrainerLimit: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
  }
  