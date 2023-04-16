import CryptoJS from 'crypto-js';
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const encryptData =(data)=> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    // localStorage.setItem(name, encrypted);
    return encrypted
}
export const decryptData = (name) => {
    const encrypted = localStorage.getItem(name);
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    // return JSON.parse(decrypted);
    return decrypted;
  }
  export const decrypt = (encrypted) => {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
    // return decrypted;
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


// const decryptedPayload = decryptPayload(encryptedPayload, secretKey, initVector);
// console.log(JSON.parse(decryptedPayload)); // logs the decrypted payload object

// const payload = {
//   foo: 'bar',
//   baz: 123,
// };

// const secretKey = 'MySecretKey12345';
// const initVector = 'MyInitVector123';

// const encryptedPayload = encryptPayload(JSON.stringify(payload), secretKey, initVector);
 // logs the base64-encoded ciphertext
