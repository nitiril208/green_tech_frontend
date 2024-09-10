import api from "./api";

export const fetchFaqs = (value: number) => {
    const url = `api/v1/faq/list`
    const params: any = {}
    if (value) {
        params["targetAudience"] = value
        params["role"] = true
    }
    return api({ url, params });
};