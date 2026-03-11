import CryptoJS from 'crypto-js';
const SECRET_KEY = 'my-secure-secret-key'; 

export const encryptData = (data) => {
  if (!data) return '';
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (ciphertext) => {
  if (!ciphertext) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("복호화 실패", error);
    return '';
  }
};