import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCuuLYiHaU8_M7qPfxMqerFXluZkx13iy8',
  authDomain: 'betcphim.firebaseapp.com',
  databaseURL:
    'https://betcphim-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'betcphim',
  storageBucket: 'betcphim.appspot.com',
  messagingSenderId: '731843362197',
  appId: '1:731843362197:web:a70aaf30d5be356a39ca9c',
  measurementId: 'G-KZ15YJ0K3R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);
export { analytics, database, auth };
