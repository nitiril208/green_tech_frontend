import api from "./api";

export const uploadImage = async (formData: FormData) => {
  const url = "upload/images";
  const method = "post";
  const response = await api({ url, method, data: formData, isFormData: true });
  return response;
};

export const uploadFile = (file: any) => {
  const url = `upload/file`,
    method = "post";
  const formData = new FormData();
  formData.append("file", file);

  return api({ url, method, data: formData, isFormData: true });
};
