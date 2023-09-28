
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBM0znX205e76IKfYbep_jbDlgH91PKV-s",
  authDomain: "internshipproject-c20da.firebaseapp.com",
  databaseURL: "https://internshipproject-c20da-default-rtdb.firebaseio.com",
  projectId: "internshipproject-c20da",
  storageBucket: "internshipproject-c20da.appspot.com",
  messagingSenderId: "946778704000",
  appId: "1:946778704000:web:35f576fdd69d2888b53e65"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;