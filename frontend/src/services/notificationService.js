import axios from "axios";

const API_BASE = "http://localhost:8080/api/notifications";

const getStoredUser = () => {
  const rawUser = localStorage.getItem("user");

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const getNotificationUserId = () => {
  const storedUser = getStoredUser();

  return (
    storedUser?.id ||
    storedUser?.userId ||
    storedUser?.email ||
    localStorage.getItem("notificationUserId") ||
    ""
  );
};

export const setNotificationUserId = (userId) => {
  localStorage.setItem("notificationUserId", userId);
};

const resolveUserId = (userId) => {
  const resolvedUserId = userId || getNotificationUserId();

  if (!resolvedUserId) {
    throw new Error("Notification user id is missing");
  }

  return encodeURIComponent(resolvedUserId);
};

export const fetchNotifications = (userId) => {
  return axios.get(`${API_BASE}/users/${resolveUserId(userId)}`);
};

export const fetchUnreadCount = (userId) => {
  return axios.get(`${API_BASE}/users/${resolveUserId(userId)}/unread-count`);
};

export const markNotificationAsRead = (userId, notificationId) => {
  return axios.patch(`${API_BASE}/users/${resolveUserId(userId)}/${notificationId}/read`);
};

export const markAllNotificationsAsRead = (userId) => {
  return axios.patch(`${API_BASE}/users/${resolveUserId(userId)}/read-all`);
};
