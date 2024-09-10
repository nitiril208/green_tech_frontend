import { AssigToUserListType, SubmitPayload, SupportTicketListType } from "@/types/SupportRequest";
import api from "./api";

export const fetchSupportTicketCompany = (id: string, role: string) => {
    const url = `api/v1/support-ticket/getCompanyOrTrainerCompany?ClientId=${id}&role=${role}`
    return api({ url });
}

export const fetchAssigToUser = async (userId: string): Promise<AssigToUserListType> => {
    const url = `api/v1/support-ticket/getAssigToUser/${userId}`
    const res = await api({ url });
    return res?.data
}

export const createSupportTicket = (data: SubmitPayload) => {
    const url = `api/v1/support-ticket/create`
    const method = "post";
    return api({ url, data, method });
}

export const fetchSupportTicketCount = (userId: string) => {
    const url = `api/v1/support-ticket/count?userId=${userId}`
    return api({ url });
};

export const fetchSupportTicketList = async (page: string, limit: string, keyword?: string,userId?: number | null): Promise<SupportTicketListType> => {
    const url = `/api/v1/support-ticket/list`
    const params: any = { page, limit,keyword, userId }
    const res = await api({ url, params });
    return res
};

export const deleteSupportTicket = (id: string) => {
    const url = `api/v1/support-ticket/delete/${id}`,
        method = "delete";
    return api({ url, method, data: {} });
}

export const fetchAssignTo = (id: string) => {
    const url = `api/v1/support-ticket/getCompany-TrainerCompany?ClientId=${id}`
    return api({ url });
}

export const getSingleSupportTicket = (id: string) => {
    const url = `api/v1/support-ticket/get/${id}`
    return api({ url });
}

export const updateSupportTicket = (data: { id: string, item: any }) => {
    const url = `api/v1/support-ticket/create-response`
    const method = "post";
    return api({ url, data: data?.item, method });
}