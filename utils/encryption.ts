import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crypto from 'crypto-es';
import {Buffer} from 'buffer';

interface JSONObj {
  ct: string;
  iv?: string;
  s?: string;
}

const JsonFormatter = {
  stringify: function (cipherParams: crypto.lib.CipherParams) {
    // create json object with ciphertext
    const jsonObj: JSONObj = {
      ct: cipherParams.ciphertext.toString(crypto.enc.Base64),
    }; // optionally add iv and salt
    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString();
    }
    if (cipherParams.salt) {
      jsonObj.s = cipherParams.salt.toString();
    }
    // stringify json object
    return JSON.stringify(jsonObj);
  },
  parse: function (jsonStr: string) {
    // parse json string
    const jsonObj: JSONObj = JSON.parse(jsonStr); // extract ciphertext from json object, and create cipher params object
    const cipherParams = crypto.lib.CipherParams.create({
      ciphertext: crypto.enc.Base64.parse(jsonObj.ct),
    }); // optionally extract iv and salt
    if (jsonObj.iv) {
      cipherParams.iv = crypto.enc.Hex.parse(jsonObj.iv);
    }
    if (jsonObj.s) {
      cipherParams.salt = crypto.enc.Hex.parse(jsonObj.s);
    }
    return cipherParams;
  },
};
export const verifyPin = async (pin: string) => {
    const pinDigest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, pin);
    const existingPin = await SecureStore.getItemAsync('pin');
    return pinDigest === existingPin;
}


export const setPin = async (pin: string) => {
    const pinDigest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, pin);
    await SecureStore.setItemAsync('pin', pinDigest);
}

export const secureSaveData = async (key: string, value: any) => {
  const pin = await SecureStore.getItemAsync("pin");
  if (!pin) return;

  const base64 = Buffer.from(JSON.stringify(value)).toString();
  const encrypted = crypto.AES.encrypt(base64, pin);
  await AsyncStorage.setItem(key, encrypted.toString());
};

export const secureGetData = async <T>(key: string): Promise<T | null> => {
  const pin = await SecureStore.getItemAsync("pin");
  if (!pin) return null;
  // Get the encrypted value from AsyncStorage
  const encryptedValue = await AsyncStorage.getItem(key);
  if (!encryptedValue) return null;

  // Decrypt the value and parse it to a base64 string
  const decrypted = crypto.AES.decrypt(encryptedValue, pin);
  const decryptedValue = decrypted.toString(crypto.enc.Base64);

  // Parse the base64 string to an object
  const buf = Buffer.from(decryptedValue, "base64");
  return JSON.parse(buf.toString());
};