import CryptoJS from 'crypto-js';
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const encryptData =(data)=> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted
}
export const decryptData = (name) => {
    const encrypted = localStorage.getItem(name);
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
  export const decrypt = (encrypted) => {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  
  }


export const encryptPayload = (payload, secretKey, initVector) => {
  // Generate key and IV
  const key = CryptoJS.SHA256(secretKey);
  const iv = CryptoJS.enc.Utf8.parse(initVector);

  // Encrypt payload
  const encrypted = CryptoJS.AES.encrypt(payload, key, { iv });

  // Return base64-encoded ciphertext
  return encrypted.toString();
};

export const decryptPayload = (encryptedPayload, secretKey, initVector) => {
  // Generate key and IV
  const key = CryptoJS.SHA256(secretKey);
  const iv = CryptoJS.enc.Utf8.parse(initVector);

  // Decrypt payload
  const decrypted = CryptoJS.AES.decrypt(encryptedPayload, key, { iv });

  // Return plaintext as string
  return decrypted.toString(CryptoJS.enc.Utf8);
};



