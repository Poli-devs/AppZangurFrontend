import axios from 'axios';

// URL de tu API Zangur (de la documentación)
const API_BASE_URL = 'https://appzangur-production.up.railway.app/api';

// Crear instancia de axios con configuración base
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente a TODAS las requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zangur_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    
    if (status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('zangur_token');
      localStorage.removeItem('zangur_user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);