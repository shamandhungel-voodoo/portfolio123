import axios from 'axios';

// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Debug log for requests
    console.log('🌐 API Request:', config.method?.toUpperCase(), config.url, config.data ? 'with data' : '');
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Test backend connection
export const testConnection = () => api.get('/api/health');

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/api/admin/login', { email, password }),
  getProfile: () => api.get('/api/admin/profile'),
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    return Promise.resolve();
  },
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/api/projects'),
  getById: (id) => api.get(`/api/projects/${id}`),
  create: (project) => api.post('/api/projects', project),
  update: (id, project) => api.put(`/api/projects/${id}`, project),
  delete: (id) => api.delete(`/api/projects/${id}`),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/api/testimonials'),
  create: (testimonial) => api.post('/api/testimonials', testimonial),
  update: (id, testimonial) => api.put(`/api/testimonials/${id}`, testimonial),
  delete: (id) => api.delete(`/api/testimonials/${id}`),
};

// Contact API
export const contactAPI = {
  sendMessage: (message) => api.post('/api/contact', message),
  getContactMessages: () => api.get('/api/contact/messages'),
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: (message) => api.post('/api/chatbot', { message }),
};

export default api;
