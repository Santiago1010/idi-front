import CryptoJS from 'crypto-js';

export function encodeAES(string) {
  // Declarar objeto "keys" que contiene la clave y el vector de inicialización para el cifrado AES
  const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5('D2B8803A7A18B9829C7D877F69565433'))
    // Calcular el vector de inicialización para el cifrado AES
  const iv = CryptoJS.enc.Utf8.parse('E5F41EB0046EAE90')

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
