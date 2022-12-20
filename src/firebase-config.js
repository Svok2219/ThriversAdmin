import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAodarp7LUdNMIrew9EVg9eceFPhKzhqF0",
  authDomain: "thrivers-assignent.firebaseapp.com",
  projectId: "thrivers-assignent",
  storageBucket: "thrivers-assignent.appspot.com",
  messagingSenderId: "535343624835",
  appId: "1:535343624835:web:3047307eecc3603103e1b6",
  measurementId: "G-F6F7CBBL9Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
