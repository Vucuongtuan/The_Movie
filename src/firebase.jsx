// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import 'firebase/auth'
import 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAKBQOylmZ7gCc7UML61GG5-cH_CUu6f5I',
  authDomain: "api-project-1c3a7.firebaseapp.com",
  projectId: "api-project-1c3a7",
  storageBucket: "api-project-1c3a7.appspot.com",
  messagingSenderId: "335860900746",
  appId: "1:335860900746:web:21a6f22bfab53ba1e59e73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };