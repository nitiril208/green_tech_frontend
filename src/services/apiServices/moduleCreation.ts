import { SectionCreation } from "@/types/modulecreation";
import api from "./api";

export const uploadFile = async (file: any, progress?: any) => {
  const url = `upload/file`,
    method = "post";
  const formData = new FormData();
  formData.append("file", file);

  const res = await api({ url, method, data: formData, isFormData: true, progressCallback: progress });

  return res
};

export const createModule = async (data: any, courseId: any) => {
  const url = `api/v1/course/module/create`,
    method = "post";

    const payload = {
        title: data.moduleTitle,
        course: courseId,
        tab: "4"
    }

  const res = await api({ url, method, data: payload });
  return res

}

export const updateModule = async (data: any, moduleId: any) => {
  const url = `api/v1/course/module/update/${moduleId}`,
    method = "put";
  const payload = {
    title: data
  }
  const res = await api({ url, method, data: payload });
  return res
}

export const createSection = async (data: any, moduleId: any) => {
  const url = `api/v1/course/module/section/create`,
    method = "post";
  const payloadData = data.map((it: any) => {
    return {
      ...it,
      uploadContentType: it.youtubeUrl ? 4 : it.uploadContentType
    }
  })

  const payload = await transformSectionPayload(payloadData, moduleId)
  const res = await api({ url, method, data: payload });
  return res
}

export const updateSection = async (data: any, moduleId: any, sectionId: any) => {
  const url = `api/v1/course/module/section/update/${sectionId}`,
    method = "put";

  const payload = await {
    isLive: false,
    title: data.sectionTitle,
    information: data.information,
    url: data.youtubeUrl,
    uploadContent: data.uploadedContentUrl,
    sectionTime: data.readingTime,
    attachment: data.uploadDocument,
    documentType: data.uploadContentType,
    module: moduleId
  }

  // const payload = await transformSectionPayload(data, moduleId)
  const res = await api({ url, method, data: payload });
  return res
}

export const updateLiveSection = async (data: any, moduleId: any, sectionId: any) => {
  const url = `api/v1/course/module/section/update-live-section/${sectionId}`,
    method = "put";
  const payload = await {
    isLive: true,
    liveSecTitle: data.sectionTitle,
    liveSecinformation: data.information,
    sectionTime: data.livesessionDuration,
    module: moduleId
  }
  const res = await api({ url, method, data: payload });
  return res
}

const transformSectionPayload = (inputArray: SectionCreation[], moduleId: number) => {
  return inputArray.map(item => {
    if (item.isLive) {
      return {
        isLive: true,
        liveSecTitle: item.sectionTitle,
        liveSecinformation: item.information,
        sectionTime: item.livesessionDuration,
        module: moduleId
      };
    } else {
      return {
        isLive: false,
        title: item.sectionTitle,
        information: item.information,
        url: item.youtubeUrl,
        uploadContent: item.uploadedContentUrl,
        sectionTime: item.readingTime,
        attachment: item.uploadDocument,
        documentType: item.uploadContentType,
        module: moduleId
      };
    }
  });
}

export const getModuleData = async (courseId?: number) => {
  const url = `api/v1/course/module/get-module-course/${courseId}`

  const res = await api({ url })

  return res
}

export const changeModulePostion = async (data: any, courseId: any) => {
  const url = `api/v1/course/module/change-position-module/${courseId}`,
    method = "put";
  const res = await api({ url, method, data });
  return res
}

export const changeSectionPostion = async (data: any, moduleId: any) => {
  const url = `api/v1/course/module/section/change-position-section/${moduleId}`,
    method = "put";
  const res = await api({ url, method, data });
  return res
}

export const deleteModule = async (moduleId: any) => {
  const url = `api/v1/course/module/delete/${moduleId}`,
    method = "delete";
  const res = await api({ url, method });
  return res
}

export const deleteSection = async (sectionId: any) => {
  const url = `api/v1/course/module/section/delete/${sectionId}`,
    method = "delete";
  const res = await api({ url, method });
  return res
}
export const deleteLiveSection = async (sectionId: any) => {
  const url = `/api/v1/course/module/section/delete/${sectionId}`,
    method = "delete";
  const res = await api({ url, method });
  return res
}

export const getModuleById = async ({ userId, courseId }: { userId: number, courseId: number }) => {
  const url = `api/v1/course/module/getModuleStatus/${userId}?courseId=${courseId}`,
    method = "get";
  const res = await api({ url, method });
  return res?.data
}