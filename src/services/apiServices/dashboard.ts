import api from "./api";


export const getFirstInfirgraphicChart = async ({ userId, clientId }: { userId: string, clientId: string }) => {
    const url = `api/v1/question/get-total-Assessment-scores/${userId}?clientId=${clientId}`;
    const res = await api({ url });
    return res.data
}

export const getSmeDashboardData = async ({ userId }: { userId: string }) => {
    const url = `api/v1/dashboard/compnyData/${userId}`;
    const res = await api({ url });
    return res.data
}

export const getDashbooardSme3 = async ({ userId }: { userId: string }) => {
    const url = `api/v1/dashboard/compnyCourseCount/${userId}`;
    const res = await api({ url });
    return res.data
}

export const getEnrolledCourses = async () => {
    const url = `api/v1/course/enroll/trend`;
    const res = await api({ url });
    return res.data
}


export const getUpcommingLiveSession = async ({ userId }: { userId: string }) => {
    const url = `api/v1/dashboard/getemployeeLiveSession/${userId}`;
    const res = await api({ url });
    return res.data
}

export const getTraineeData = async ({ userId }: { userId: string }) => {
    const url = `api/v1/dashboard/getTrainerDashboardCountData/${userId}`;
    const res = await api({ url });
    return res.data
}

export const getTrainerData = async ({ userId, contentType }: { userId: string, contentType: string }) => {
    const url = `api/v1/dashboard/trainerCompanyCourseCount/${userId}?contentRequest=${contentType}`;
    const res = await api({ url });
    return res.data
}

export const getCourseCompletionData = async (companyId: number) => {
    const url = `api/v1/dashboard/course-completion?companyId=${companyId}`;
    const res = await api({ url });
    return res.data
}

export const fetchTopCourseList = async () => {
    const url = `api/v1/course/top/list`;
    const res = await api({ url });
    return res.data
}