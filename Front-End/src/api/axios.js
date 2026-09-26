import axios from "axios";

const API_URL = import.meta.env.API_SECRET_URL;

let accessToken = null;
let refreshPromise = null;
let onUnauthorized = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

export const refreshSession = () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_URL}/auth/refresh-token`, null, { withCredentials: true })
      .then((response) => {
        accessToken = response.data.accessToken;
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const skipRefresh = ["/auth/login", "/auth/register"].includes(
      original?.url,
    );

    if (error.response?.status !== 401 || original._retry || skipRefresh) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      const newToken = await refreshSession();
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (refreshError) {
      accessToken = null;
      onUnauthorized?.();
      return Promise.reject(refreshError);
    }
  },
);

export default api;
