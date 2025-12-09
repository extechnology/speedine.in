import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request: attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("accessToken");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/token/refresh/`,
          { refresh }
        );

        // Get new access token
        const newAccess = res.data.access;
        localStorage.setItem("accessToken", newAccess);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);

      } catch (err) {
        // Refresh token expired → force logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Redirect to login page
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
