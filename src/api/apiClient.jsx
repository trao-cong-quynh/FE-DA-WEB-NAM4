import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL_1,
  headers: {
    Accept: "application/json",
  },
  timeout: 10000, // Timeout 10s
});

// Interceptor để xử lý lỗi chung
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Lỗi 401: Vui lòng đăng nhập lại");
      // Có thể thêm logic chuyển hướng: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
