// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUL8R4b-uiSPHjjbXaMRMk5UowYveWJ8c",
  authDomain: "usermanagementapp-d9547.firebaseapp.com",
  projectId: "usermanagementapp-d9547",
  storageBucket: "usermanagementapp-d9547.appspot.com",
  messagingSenderId: "43806956688",
  appId: "1:43806956688:android:690217b1f77b7576ab4c15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
