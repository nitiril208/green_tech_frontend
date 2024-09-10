import { faqData } from "@/types";
import api from "./api";

export const fetchfaqdata = async (): Promise<faqData> => {
    const url = `/api/v1/faq/getFAQquestion`;
    const res = await api({ url });
    return res.data;
  };