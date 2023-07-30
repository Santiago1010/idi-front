import CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode'

export function encodeAES(string) {
  // Declarar objeto "keys" que contiene la clave y el vector de inicialización para el cifrado AES
  const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(import.meta.env.VITE_AES_KEY))
  // Calcular el vector de inicialización para el cifrado AES
  const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IV)

  // Se retorna el string encriptado.
  return CryptoJS.AES.encrypt(string, key, { iv: iv }).toString();
}

export function encodeSHA256(string) {
  // Calcular el hash SHA-256 de la cadena de entrada y devolver el resultado como una cadena de texto
  return CryptoJS.SHA256(string).toString();
}

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function setNewPassword(password) {  // Calcular el hash SHA-256 de la contraseña
  const hash = encodeSHA256(password);

  // Cifrar la contraseña utilizando AES
  const encryptedPassword = encodeAES(hash);

  // Devolver la contraseña cifrada como una cadena de texto
  return encryptedPassword;
}

export function validateToken() {
  const token = localStorage.getItem('jwt')
  if (!token) {
    return false
  }

  try {
    const decoded = jwt_decode(token)
    const currentTime = Math.floor(Date.now() / 1000)

    if (decoded.exp < currentTime) {
      // El token ha expirado
      console.error('El token ha expirado')
      return false
    }

    if (decoded.iss !== import.meta.env.VITE_API_SERVER_URI) {
      // El token no fue emitido por la API certificada
      console.error('El token no fue emitido por la API certificada')
      return false
    }

    if (decoded.aud !== import.meta.env.VITE_SERVER_URL_AUD) {
      // El token no fue emitido para este cliente
      console.error('El token no fue emitido para este cliente')
      return false
    }

    // Token válido
    return decoded.data
  } catch (error) {
    // Error al decodificar el token
    console.error('Error al decodificar el token')
    console.error(error)
    return false
  }
}

export function setFormData(data) {
  const formData = new FormData();

  Object.keys(data).forEach(function(property) {
    formData.append(property, data[property]);
  });

  return formData;
}
