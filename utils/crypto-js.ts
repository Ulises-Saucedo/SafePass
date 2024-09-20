import CryptoJS from "crypto-js";

const secretKey = "mi-clave-secreta";

function encryptPassword(password: string): string {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

function decryptPassword(encryptedPassword: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
