export interface GetFeedback {
    data?: (DataEntity)[] | null;
    message: string;
}
export interface DataEntity {
    id: number;
    courseRate: number;
    trainerRate: number;
    discription: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    course: Course;
    user: User;
    trainerCompany: TrainerCompany;
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
    courseData?: (CourseDataEntity)[] | null;
    status: string;
    step: string;
    tab: string;
    creationCompleted: boolean;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
export interface CourseDataEntity {
    pillarId: number;
    maturityId: number;
}
export interface User {
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
    deviceTokens?: (null)[] | null;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    companyDetails?: null;
    trainerDetails?: null;
    trainerCompanyDetails?: null;
    employeeDetails: EmployeeDetails;
}
export interface EmployeeDetails {
    id: number;
    name: string;
    email: string;
    status: string;
    employeeStatus: string;
    gender?: null;
    ageRange?: null;
    phone?: null;
    nFQ?: null;
    employmentStatus?: null;
    memberCompany?: null;
    occupationalCategory?: null;
    unemploymentTime?: null;
    countyOfResidence?: null;
    attendedEvent?: null;
    profileImage?: null;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    editActionItem: boolean;
    retakeSelfAssessment: boolean;
    shareFeedback: boolean;
}
export interface TrainerCompany {
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
    userDetails: UserDetails;
}
export interface UserDetails {
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
    deviceTokens?: (null)[] | null;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
