import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4ZReUgcwVm82h2hnJ9cSRFQyJ2AuFgJo",
  authDomain: "alojapp-b90f1.firebaseapp.com",
  projectId: "alojapp-b90f1",
  storageBucket: "alojapp-b90f1.appspot.com",
  messagingSenderId: "658716570807",
  appId: "1:658716570807:web:8aee6dc2fb111d829b4932"
};

export const FIREBASE_app = initializeApp(firebaseConfig);
export const FIREBASE_auth = getAuth(FIREBASE_app);