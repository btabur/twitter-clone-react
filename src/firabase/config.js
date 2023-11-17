// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzv3kaA_TGyJRbzQyfKe2JC3PDvlDcaPU",
  authDomain: "twitter-clone-37f19.firebaseapp.com",
  projectId: "twitter-clone-37f19",
  storageBucket: "twitter-clone-37f19.appspot.com",
  messagingSenderId: "873689323872",
  appId: "1:873689323872:web:8e91e39268e920599ea605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app)

export const provider = new GoogleAuthProvider();

export const storage = getStorage();


//firestore referansı al

export const db = getFirestore(app)