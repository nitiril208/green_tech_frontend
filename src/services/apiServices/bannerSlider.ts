

import api from "./api";

export const fetchBannerSlider = () => {
    const url = `api/v1/slider/list`;

    return api({ url });
};

export const clientwiseBannerSlider = (id: string) => {
    const url = `api/v1/slider/list?clientId=${id}`;

    return api({ url });
};

export const getHomeBanner = async (id: string, type: string) => {
    const url = `api/v1/slider/getDeshboardSlider?clientId=${id}&status=${type}`;
    const res = await api({ url });
    return res.data;
};

clientwiseBannerSlider