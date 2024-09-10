export interface AssecessmentCreation {
  section: string;
  title: string;
  percentage: string;
  timeBound: string;
  duration: string;
  question: QuestionCreation[]
}

export interface QuestionCreation {
  id?: number;
  ids?: number;
  question: string,
  point: number,
  options: [{
    option: string;
  }],
  assessmentType: string,
  answer: number[] | string
}

export interface AssessmentById {
  data: Data;
  message: string;
}
export interface Data {
  id: number;
  title: string;
  passingPercentage: string;
  timeBound: number;
  timeDuration: TimeDuration;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  moduleSection: ModuleSection;
  AssessmentQuestion: any[];
}
export interface ModuleSection {
  id: number;
  title: string;
  information: string;
  documentType: number;
  url: string;
  uploadContent: string;
  attachment: string;
  duration?: null;
  formate?: null;
  position: number;
  readingTime: ReadingTime;
  isLive: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface ReadingTime {
  hour: number;
  minute: number;
  second: number;
}


export interface EmpAssesmentQuestionType {
  data?: QuestionDataEntity[] | null;
  message: string;
}
export interface QuestionDataEntity {
  id: number;
  question: string;
  point: number;
  assessmentType: string;
  option?: (string | null)[] | null | any;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface GetAssessmentSingleQuestion {
  data: AssessmentData;
  message: string;
}
export interface AssessmentData {
  id: number;
  title: string;
  passingPercentage: string;
  timeBound: number;
  timeDuration: TimeDuration;
  position: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  module: Module;
}
export interface TimeDuration {
  hours: number;
  minutes: number;
  seconds: number;
}
export interface Module {
  id: number;
  title: string;
  position: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentScoreType {
  data: AssessmentScoreDataEntity;
  message: string;
}
export interface AssessmentScoreDataEntity {
  isPassed: string;
  totalCorrect: TotalCorrectOrTotal;
  total: TotalCorrectOrTotal;
  YourPercentage: number;
  assessmentPercentage: number;
}
export interface TotalCorrectOrTotal {
  point: number;
  questions: number;
}
