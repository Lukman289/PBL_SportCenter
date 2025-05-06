import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Untuk mengirim cookies
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika error adalah token expired dan belum mencoba refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Coba refresh token
        const response = await AxiosInstance.post('/auth/refresh-token');
        const { token } = response.data;
        
        // Update token di localStorage
        localStorage.setItem('token', token);
        
        // Update header Authorization
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        // Ulangi request yang gagal
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        // Jika refresh token gagal, hapus data auth dan redirect ke login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
