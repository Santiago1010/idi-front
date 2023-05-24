import axios from 'axios';

import { i18n } from './i18n'

// Configuración global de Axios
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER_URI}/api/v1`,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

// Interceptor para agregar la cabecera del idioma a todas las solicitudes
instance.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = localStorage.language;

  const token = localStorage.getItem('jwt'); // Obtiene el token JWT almacenado en el cliente
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token JWT a la cabecera de autorización
  }

  return config;
});

// Rutas públicas
export const publicRoutes = {
  signup: (userData) => instance.post('/signup', userData),
  readAllExtensions: () => instance.get(`/public/read/extensions`),
  readInstitutions: () => instance.get('/public/read/institutions'),
  recoverPasswordEmail: (type, email) => instance.patch(`/public/${type}/token/password`, { email })
};

// Rutas autenticadas
export const authenticatedRoutes = {
  updateProfile: (profileData) => instance.put('/profile', profileData),
};

export default instance;
