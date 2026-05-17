import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ats-checker-1-as0g.onrender.com/api',
  withCredentials: true
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  signup: (data) => API.post('/auth/register', data),
  logout: () => API.post('/auth/logout'),
  me: () => API.get('/auth/me'),
};

export const atsAPI = {
  uploadResume: (formData) => API.post('/ats/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  analyzeResume: (data) => API.post('/ats/analyze', data),
  getHistory: () => API.get('/ats/history'),
};

export default API;
