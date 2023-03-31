// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb84AVoHHPR8DsaEJQD2SrBuLtAHZgR2I",
  authDomain: "chhatapp-f4a7a.firebaseapp.com",
  projectId: "chhatapp-f4a7a",
  storageBucket: "chhatapp-f4a7a.appspot.com",
  messagingSenderId: "539737397379",
  appId: "1:539737397379:web:731285bb7696db5e5063b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);