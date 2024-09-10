import api from "./api";

export const uploadFile = (file: any) => {
    const url = `upload/file`,
        method = "post";
    const formData = new FormData();
    formData.append("file", file);

    return api({ url, method, data: formData, isFormData: true });
};

export const readCSVFile = (file: any) => {
    const url = `csv-read`,
        method = "post";
    const formData = new FormData();
    formData.append("file", file);

    return api({ url, method, data: formData, isFormData: true });
};