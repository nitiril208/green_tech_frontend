/* eslint-disable @typescript-eslint/ban-ts-comment */
export interface Pillar {
  id: number;
  pillarName: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  checked: number;
}

export interface SinglePillar {
  pillarid: number;
  checked: number;
  pillarname: string;
  totalquestionsattempted: string;
  totalquestionsavailable: string;
  totalmaxpoint: string;
  totalpoints: string;
  questiontitle: string;
  value: number;
  maturityLevelName?: null;
  rangeStart?: null;
  rangeEnd?: null;
  maturityNameRecommended: string;
  filteredOptions?: FilteredOptionsEntity[];
}
export interface FilteredOptionsEntity {
  name?: string;
  point?: number;
  measures?: string;
  optionId?: string;
  percentage?: number;
}

export interface PillerResponse {
  data: DataEntity[];
  message: string;
  clientData: boolean;
}
export interface DataEntity {
  id: number;
  pillarName: string;
  checked: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface Headers {
  "content-length": string;
  "content-type": string;
}
export interface Config {
  transitional: Transitional;
  adapter?: string[] | null;
  transformRequest?: null[] | null;
  transformResponse?: null[] | null;
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: EnvOrRequest;
  headers: Headers1;
  baseURL: string;
  url: string;
  method: string;
  data: string;
}
export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}
export interface EnvOrRequest { }
export interface Headers1 {
  Accept: string;
  "Content-Type": string;
}

export interface QuestionsByPillerResponse {
  data: Data;
  message: string;
}
export interface Data {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // @ts-ignore
  [key: string]: EnviromentalEntity[];
}
export interface EnviromentalEntity {
  id: number;
  title: string;
  answers: string;
  maxPoint: number;
  options?: OptionsEntityOrSelectedOptionsEntity[] | null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  pillar: DataEntity;
  questionAnswers?: QuestionAnswersEntity[] | null;
  questionScores: number;
}
export interface OptionsEntityOrSelectedOptionsEntity {
  name: string;
  point: number;
  measures: string;
  optionId: string;
}
export interface QuestionAnswersEntity {
  id: number;
  selectedOptions?: OptionsEntityOrSelectedOptionsEntity[] | null;
  point: number;
  createdAt: string;
  updatedAt: string;
}

export interface PillerWiseProgressResponse {
  data?: (DataEntity)[] | null;
  message: string;
}
export interface DataEntity {
  pillarName: string;
  progress: number;
}


export interface MeasuresItemsResponse {
  data?: (MeasuresItemsResult)[] | null;
  message: string;
}
export interface MeasuresItemsResult {
  id: number;
  measure: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  pillerId: PillerDataResult;
}
export interface PillerDataResult {
  id: number;
  pillarName: string;
  checked: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
