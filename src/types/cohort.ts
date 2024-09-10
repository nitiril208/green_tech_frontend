import { TrainerCompanyId, TrainerId } from "./courseManagement";

export interface cohortgroupResponse {
    data?: (DataEntity)[] | null;
    message: string;
}
export interface DataEntity {
    end_date: Date | undefined;
    id: number;
    name: string;
    publish: number;
    slotStartDate: SlotStartDateOrSlotEndDate;
    slotEndDate: SlotStartDateOrSlotEndDate;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    courseVersion: CourseVersion;
}
export interface SlotStartDateOrSlotEndDate {
    date: string;
    month: string;
    year: string;
}
export interface CourseVersion {
    id: number;
    version: number;
    data: Data;
    createdAt: string;
    updatedAt: string;
}
export interface Data {
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
    courseData?: (null)[] | null;
    TrainerCompanyId: TrainerCompanyId;
    TrainerId: TrainerId;
    status: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    nfqLeval: string;
    certificate: string;
    providerName: number;
    clientId: number;
    userId: number;
}
