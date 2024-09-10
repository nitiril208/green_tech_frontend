import api from "./api";


export const fetchDocument = async ({ page, role, keyword }: { page: number, role: number, keyword: string }) => {
    const url = `api/v1/document/list?page=${page}&limit=10&targetAudience=${role}&role=true&keyword=${keyword}`;
    const res = await api({ url });
    return res.data
}