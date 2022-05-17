import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 60000,
});

axiosInstance.interceptors.request.use(config => {
  return config;
},
error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
},
error => {
  if(error.response?.status === 401) {
    console.log(error);
  }
  return Promise.reject(error);
});

