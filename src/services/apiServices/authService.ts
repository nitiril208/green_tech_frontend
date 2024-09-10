import { ResetPasswordType } from "@/types/auth";
import api from "./api";


export const Login = (data: { email: string, password: string }): Promise<any> => {
    const url = `api/v1/user/login`,
        method = "post";

    return api({ url, method, data });
};

export const ResetPasswordApi = (data: { data: ResetPasswordType }): Promise<any> => {
    const url = `api/v1/user/reset-password`;
    const method = "post";
    return api({ url, method, data });
}

export const ResendOtp = async (data: { email: string }): Promise<any> => {
    const url = `api/v1/user/resend`;
    const method = "post";
    const res = await api({ url, method, data });
    return res.data
}

export const LogOut = async (userId: string) => {
    const url = `api/v1/user/logout`;
    const method = "post";
    const res = await api({ url, method, data: { userid: userId } });
    return res?.data
}

export const ForgetPassword = async ({ email, baseurl }: { email: string, baseurl: string }) => {
    const url = `api/v1/user/forgot-password`;
    const method = "post";
    const res = await api({ url, method, data: { email, baseurl } });
    return res
}

export const SetPassword = async (data: { token: string, password: string, confirmPassword: string }) => {
    const url = `api/v1/user/set-password`;
    const method = "post";
    const res = await api({ url, method, data });
    return res
}