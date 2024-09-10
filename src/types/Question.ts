import { Pillar } from "./Pillar";

// export interface Option {
//   name: string;
//   point: number;
//   optionId: string;
//   checked?: boolean;
// }

// export interface QuestionType {
//     id: number;
//     title: string;
//     maxPoint: number;
//     options: Option[];
//     deletedAt: string | null;
//     createdAt: string;
//     updatedAt: string;
//     pillar: Pillar;
//     hint: string;
// }

export interface QuestionListResponse {
  data: Data;
  message: string;
}
export interface Data {
  [key: string]: QuestionType[];
}
export interface QuestionType {
  id: number;
  title: string;
  maxPoint: number;
  options: Option[];
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  pillar: Pillar;
}
export interface Option {
  name: string;
  point: number;
  measures: string;
  optionId: string;
  checked?: boolean;
}
