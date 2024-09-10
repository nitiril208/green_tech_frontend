export interface NfqlLevelResponse {
    data?: (DataEntity)[] | null;
    message: string;
}
export interface DataEntity {
    id: number;
    leval: string;
    status: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
