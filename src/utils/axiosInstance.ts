import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://your-api-domain.com/api', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
     const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
     console.error('Erreur API :', error.response || error.message);
    return Promise.reject(error);
  }
);
