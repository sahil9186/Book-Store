
import axios from 'axios';

// Get base URL from environment variable
const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for error handling can be added here
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || 'Something went wrong. Please try again later.',
      status: error.response?.status,
    };
    return Promise.reject(customError);
  }
);

export default api;
