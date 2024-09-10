export interface FeedbackSingleResponse {
    data: Data;
    message: string;
}
export interface Data {
    id: number;
    courseRate: number;
    trainerRate: number;
    discription: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    shareFeedback?: boolean; 
}
