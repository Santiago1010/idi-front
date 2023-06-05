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
  config.headers['Accept-Language'] = 'es';//localStorage.language;

  const token = localStorage.getItem('jwt'); // Obtiene el token JWT almacenado en el cliente
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token JWT a la cabecera de autorización
  }

  return config;
});

const generateQueryString = (queries) =>
  queries
    ? Object.keys(queries)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`)
        .join('&')
    : '';

const createRoute = (path, queries) =>
  queries
    ? `${path}${generateQueryString(queries) ? `?${generateQueryString(queries)}` : ''}`
    : path;

// Rutas públicas
export const publicRoutes = {
  signup: (userData) => instance.post(`/public/user`, userData),
  readAllExtensions: () => instance.get(`/public/read/extensions`),
  readInstitutions: () => instance.get('/public/read/institutions'),
  validToken: (type, token, queries) => instance.get(createRoute(`/public/${type}/valid/token/${token}`, queries)),
  readCampuses: (queries) => instance.get(createRoute('/public/read/campuses', queries)),
  login: (type, data) => instance.post(`/public/login/${type}`, data),
  recoverPasswordEmail: (type, email) => instance.patch(`/public/${type}/token/password`, { email }),
  recoverPassword: (type, token, data) => instance.patch(`/public/${type}/recover/${token}`, data),
  confirmAccount: (type, token, data, queries) => instance.patch(createRoute(`/public/${type}/confirm/${token}`, queries), data)
};

// Rutas autenticadas
export const authenticatedRoutes = {
  updateProfile: (profileData) => instance.put('/profile', profileData),
};

export default instance;
