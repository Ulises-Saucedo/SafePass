import CryptoJS from "crypto-js";

const runtimeConfig = useRuntimeConfig();
const secretKey = runtimeConfig.public.secretKey;

export function encryptPassword(password: string): string {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

export function decryptPassword(encryptedPassword: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
