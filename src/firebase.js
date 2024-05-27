// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcssa2Qz_L1JTLzFnhKooOjhYg9QTopAY",
  authDomain: "profile-image-1c78a.firebaseapp.com",
  projectId: "profile-image-1c78a",
  storageBucket: "profile-image-1c78a.appspot.com",
  messagingSenderId: "776808269092",
  appId: "1:776808269092:web:7c0435f85ae25439b6dfb1",
  measurementId: "G-C6BX3Q6M7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);