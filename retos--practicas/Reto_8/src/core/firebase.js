import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyC7cCHbOHiDmlI-WEF8tff43W5mMuNVvIk",
  authDomain: "estructura-a7c65.firebaseapp.com",
  projectId: "estructura-a7c65",
  storageBucket: "estructura-a7c65.firebasestorage.app",
  messagingSenderId: "630561703103",
  appId: "1:630561703103:web:a2041fa3765a47c558720a"
};
const app = initializeApp(firebaseConfig);
export const authInstance = getAuth(app);
