// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyCS31CthFHX8-d5ojlzUTnOzS121low9xY",
    authDomain: "hackathon-task-2f550.firebaseapp.com",
    projectId: "hackathon-task-2f550",
    storageBucket: "hackathon-task-2f550.appspot.com",
    messagingSenderId: "780056700144",
    appId: "1:780056700144:web:f82ab45fb445d3008d4e35",
    measurementId: "G-GSPE95K016"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);