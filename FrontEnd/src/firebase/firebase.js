import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const FIREBASE_KEY = "AIzaSyC26EwVsfq5-GTz6vk0JGxKzQkBjUJ2fVA";
const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "super20-d32d2.firebaseapp.com",
  projectId: "super20-d32d2",
  storageBucket: "super20-d32d2.appspot.com",
  messagingSenderId: "395530733212",
  appId: "1:395530733212:web:e0ad2ce092e280a5abcf59"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth}