import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBO9FyulUuXAI3EB31wh-Egr6TGxeSzhsY",
  authDomain: "nextauthcrud-9fc32.firebaseapp.com",
  projectId: "nextauthcrud-9fc32",
  storageBucket: "nextauthcrud-9fc32.appspot.com",
  messagingSenderId: "430040468732",
  appId: "1:430040468732:web:1e5e864939a2bf77f95b79"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);