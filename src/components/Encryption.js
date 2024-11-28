//https://dev.to/jobizil/encrypt-and-decrypt-data-in-nodejs-using-aes-256-cbc-2l6d

import CryptoJS from 'crypto-js';

//hardcoded key
const secret_key = 'mysecretkey123';


export function encrypt(formData){

    const cipher = CryptoJS.AES.encrypt(formData, secret_key).toString();
    return cipher;
}

export function decrypt(encryptedFormData){

    const decipher = CryptoJS.AES.decrypt(encryptedFormData, secret_key);
    const decryptedFormData = decipher.toString(CryptoJS.enc.Utf8)
    return decryptedFormData;
}
