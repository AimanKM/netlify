/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export const errorMessage = (errorCode) => {
  // Login
  if (['auth/wrong-password','auth/user-not-found'].includes(errorCode)) {
    return toast.error('Login failed, invalid information');
  }
  if (errorCode === 'auth/too-many-requests') {
    return toast.error('Too many attempts try later');
  }
  // Signup
  if (errorCode === 'auth/weak-password') {
    return toast.error('password weak, Please enter another password');
  }
  if (errorCode === 'auth/invalid-email') {
    return toast.error('Email already in use');
  }
  if (errorCode === 'auth/email-already-in-use') {
    return toast.error('Email already in use');
  }
  if (errorCode === 'password-does-match') {
    return toast.error('Password does not match');
  }
  // No internet
  if (errorCode === 'auth/network-request-failed') {
    return toast.error('No internet connection');
  }
  return toast.error('There are some errors');
};

export default auth;
