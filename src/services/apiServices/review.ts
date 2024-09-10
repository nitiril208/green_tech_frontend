import api from "./api";


export const addReview = async (data: any) => {
    const url = `api/v1/feedback/create`;
    const res = await api({ url, data, method: "post" });
    return res.data
}

export const getFeedback = async (id: number, filter: string) => {
    const url = `api/v1/feedback/list/${id}`;
    const params:any = {}

    if(filter){
        params["filter"] = filter;
    }
    const res = await api({ url, params });
    return res.data;
}