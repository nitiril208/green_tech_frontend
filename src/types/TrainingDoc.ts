export interface TrainingDocumentResponse {
    data?: (TrainingDocumentResult)[];
    metadata: Metadata;
    message: string;
}
export interface TrainingDocumentResult {
    id: number;
    title: string;
    type: string;
    documentUrl: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    targetAudience: TargetAudience;
}
export interface TargetAudience {
    id: number;
    name: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
export interface Metadata {
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
