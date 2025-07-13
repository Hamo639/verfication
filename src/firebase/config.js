// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB59WG7-1GZI-sTi3xQ1dd2I-R1Z34C4ZU",
  authDomain: "signin-22666.firebaseapp.com",
  projectId: "signin-22666",
  storageBucket: "signin-22666.firebasestorage.app",
  messagingSenderId: "1035645892687",
  appId: "1:1035645892687:web:1c4c2905c8c325fd02d23a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);