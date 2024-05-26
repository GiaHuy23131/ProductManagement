// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDlP8ktM9lQWMnfrqV75IbOBJjB0kPLOok",
    authDomain: "product-895b2.firebaseapp.com",
    databaseURL: "https://product-895b2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "product-895b2",
    storageBucket: "product-895b2.appspot.com",
    messagingSenderId: "1029205876104",
    appId: "1:1029205876104:web:b935495093d02e89b1ee3d",
    measurementId: "G-0PY80BSSJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
