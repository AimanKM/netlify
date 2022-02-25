/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_APIKEY,
  projectId: process.env.REACT_APP_FIREBASE_APIKEY,
  storageBucket: process.env.REACT_APP_FIREBASE_APIKEY,
  messagingSenderId: process.env.REACT_APP_FIREBASE_APIKEY,
  appId: process.env.REACT_APP_FIREBASE_APIKEY,
  measurementId: process.env.REACT_APP_FIREBASE_APIKEY,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
