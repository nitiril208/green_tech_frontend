import api from "./api";

export const fetchNotification = (id: string) => {
  const url = `api/v1/notification/list/${id}`;

  return api({ url });
};

export const deleteNotificationById = (id: string) => {
  const url = `api/v1/notification/delete/${id}`,
    method = "delete";

  return api({ url, method, data: {} });
};

export const deleteMultipleNotification = (ids: string[]) => {
  const url = `api/v1/notification/delete`,
    method = "delete";

  const queryParams = ids.map((id) => `notificationIds=${id}`).join("&");
  return api({ url: `${url}?${queryParams}`, method, data: {} });
};

export const fetchNotificationById = (id: string) => {
  const url = `api/v1/notification/get/${id}`;

  return api({ url });
};

export const markAsReadUnread = (data: {
  notificationId: string;
  read: boolean;
}) => {
  const url = `api/v1/notification/read`,
    method = "put";

  return api({ url, method, data });
};

export const fetchNotificationCount = (id: string) => {
  const url = `api/v1/notification/unread/${id}`;

  return api({ url });
};
