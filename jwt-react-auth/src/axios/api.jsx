import axios from 'axios';
import { BASE_URL } from '../constant';
import { useNavigate } from 'react-router-dom';
const api = axios.create({
  baseURL: BASE_URL,
});

// const nav = useNavigate()


// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        
      const originalRequest = error.config;
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post(`${BASE_URL}api/token/refresh/`, { "refresh":refreshToken });
          const { access } = response.data;
  
          localStorage.setItem('accesstoken', access);
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axios(originalRequest);

        } catch (error) {
            if (error.response.status === 401) {
                return Promise.reject({ customError: 'TokenExpired' });
            }
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default api