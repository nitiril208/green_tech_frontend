import { AssessmentById, AssessmentScoreType, EmpAssesmentQuestionType, GetAssessmentSingleQuestion } from "@/types/assecessment";
import api from "./api";

interface createAssessmentProps {
  module: string | null,
  title?: string,
  passingPercentage?: string,
  timeBound?: number,
  timeDuration?: {
    hours: number,
    minutes: number,
    seconds: number
  }
}

export const fetchAssessment = (id: string, clientId: string) => {
  const url = `api/v1/question/get-assessment-scores/${id}?clientId=${clientId}`;

  return api({ url });
};

export const getAllassessment = (id: string, clientId: string) => {
  const url = `api/v1/question/get-total-Assessment-scores/${id}?clientId=${clientId}`;
  return api({ url });
};

export const getAssessmentOptions = () => {
  const url = `api/v1/assessment/get-options`;
  return api({ url });
};

export const getModuleSection = (id: string) => {
  const url = `api/v1/course/module/get/${id}`;
  return api({ url });
};

export const createAssessment = (data: createAssessmentProps) => {
  const url = `api/v1/assessment/create`;
  const method = "post";
  return api({ url, data, method });
};

export const updateAssessment = async ({ data, id }: { data: createAssessmentProps | any, id: string }) => {
  const url = `api/v1/assessment/update/${id}`;
  const method = "put";
  const res = await api({ url, data, method });
  return res.data
};
export const createAssessmentQuestion = (data: any) => {
  const url = `api/v1/assessment/create-question`;
  const method = "post";
  return api({ url, data, method });
};

export const getAssessmentById = async (id: string): Promise<AssessmentById> => {
  const url = `api/v1/assessment/get/${id}`;
  const res = await api({ url });
  return res.data;
};

export const deleteAssesment = async (id: number) => {
  const url = `api/v1/assessment/delete/${id}`;
  const res = await api({ url, method: "delete", data: {} });
  return res.data
}

export const fetchAssesmentQuestion = async (assecessmentId: string): Promise<EmpAssesmentQuestionType> => {
  const url = `api/v1/assessment/get-question/${assecessmentId}`;
  const res = await api({ url });
  return res.data
}

export const fetchAssesmentSingleQuestion = async (assecessmentId: string): Promise<GetAssessmentSingleQuestion> => {
  const url = `api/v1/assessment/get-without-question/${assecessmentId}`;
  const res = await api({ url });
  return res.data
}

export const createEvalute = async (data: any) => {
  const url = `api/v1/evalute/create`;
  const method = "post";
  return api({ url, data, method });
}

export const fetchAssessmentScore = async (assessmentId: string, employeeId: string): Promise<AssessmentScoreType> => {
  const url = `api/v1/assessment/get-emp-score`;
  const params: any = {};
  if(assessmentId){
    params["assessmentId"] = assessmentId;
  }
  if(employeeId){
    params["employeeId"] = employeeId;
  }
  const res = await api({ url, params });
  return res.data
}