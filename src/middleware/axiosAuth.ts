import axios from 'axios';
import {API_URL} from '../../env/env.json'
import { getGenericPassword, authKeychainService, setGenericPassword } from '../services/Keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosAuth = axios.create({
    baseURL: '/api',
});

// Add a request interceptor
axiosAuth.interceptors.request.use(
    async (config) => {
      const token = await getGenericPassword({ service: authKeychainService });
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    async (error) => {
    //   const navigate = useNavigate();
    //   navigate('/login')
      Promise.reject(error)
    }
);

// Add a response interceptor
axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          const res = await axios.post(`${API_URL}/auth/tokenRefresh`, { refreshToken });
          const token = res.data.response;
          await setGenericPassword('token', token, {
            service: authKeychainService,
          })
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (error) {
            // const navigate = useNavigate();
            // navigate('/login')
        }
      }
      return Promise.reject(error);
    }
  );

export default axiosAuth
  