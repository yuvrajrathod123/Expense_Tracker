import axios from "axios";

const API = import.meta.env.BACKEND_API_URL; 

const axiosInstance = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

// 🔹 Response interceptor to auto-refresh token
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const res = await axios.post(`${API}/auth/refresh`, { refreshToken });
          localStorage.setItem("accessToken", res.data.accessToken);

          // attach new token to original request
          originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          localStorage.clear();
          window.location.href = "/login"; // redirect instead of reload
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
