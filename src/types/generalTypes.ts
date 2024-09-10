import { ReactNode } from "react";

export type AccordionOption = {
  title: ReactNode;
  content: ReactNode;
};

export interface faqData {
  data?: (Faq)[] | null;
  message: string;
}
export interface Faq {
  question: string;
  answer: string;
}
