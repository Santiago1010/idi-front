import axios from 'axios';

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
  const language = 'es';
  config.headers['Accept-Language'] = language;

  const token = localStorage.getItem('jwt'); // Obtiene el token JWT almacenado en el cliente
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token JWT a la cabecera de autorización
  }

  return config;
});

// Rutas públicas
export const publicRoutes = {
  loginUser: (credentials) => instance.post('/login', credentials),
  signup: (userData) => instance.post('/signup', userData),
};

// Rutas autenticadas
export const authenticatedRoutes = {
  getUserData: () => instance.get('/user-data'),
  updateProfile: (profileData) => instance.put('/profile', profileData),
};

export default instance;
