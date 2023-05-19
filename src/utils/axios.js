import axios from 'axios';

// Configuración global de Axios
const instance = axios.create({
  baseURL: 'https://api.example.com', // Cambia esto por la URL base de tu API
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

// Interceptor para agregar la cabecera del idioma a todas las solicitudes
instance.interceptors.request.use((config) => {
  const language = 'es'; // Cambia esto por el idioma actual de tu aplicación
  config.headers['Accept-Language'] = language;

  const token = localStorage.getItem('jwt'); // Obtiene el token JWT almacenado en el cliente
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token JWT a la cabecera de autorización
  }

  return config;
});

// Rutas públicas
export const publicRoutes = {
  login: (credentials) => instance.post('/login', credentials),
  signup: (userData) => instance.post('/signup', userData),
};

// Rutas autenticadas
export const authenticatedRoutes = {
  getUserData: () => instance.get('/user-data'),
  updateProfile: (profileData) => instance.put('/profile', profileData),
};

export default instance;
