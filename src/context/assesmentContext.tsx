import { QuestionCreation } from "@/types/assecessment";
import React from "react";

export const AssesmentContext = React.createContext<AssesmentValue>({
  assesment: [],
  setAssesment: () => {},
});

export const intialSectionCreation: QuestionCreation = {
  question: "",
  point: 0,
  options: [
    {
      option: "",
    },
  ],
  assessmentType: "",
  answer: [],
};

interface AssesmentValue {
  assesment: QuestionCreation[];
  setAssesment: React.Dispatch<React.SetStateAction<QuestionCreation[]>>;
}

export const AssessmentProvider = ({ children }: any) => {
  const [assesment, setAssesment] = React.useState<QuestionCreation[]>([]);

  const value: AssesmentValue = {
    assesment,
    setAssesment,
  };

  return (
    <AssesmentContext.Provider value={value}>
      {children}
    </AssesmentContext.Provider>
  );
};
