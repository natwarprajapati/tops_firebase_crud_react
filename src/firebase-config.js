// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcXfnl-cHdjIktRUoKVVCS7gYHGrax3P0",
  authDomain: "reactcrudwithfirebase-b3ecc.firebaseapp.com",
  databaseURL: "https://reactcrudwithfirebase-b3ecc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reactcrudwithfirebase-b3ecc",
  storageBucket: "reactcrudwithfirebase-b3ecc.appspot.com",
  messagingSenderId: "68357565053",
  appId: "1:68357565053:web:a2f75cd4514e339c57df14",
  measurementId: "G-W7544L3ZRT"
};

// for env file


// REACT_APP_FIREBASE_API_KEY= "AIzaSyDcXfnl-cHdjIktRUoKVVCS7gYHGrax3P0"
// REACT_APP_FIREBASE_AUTH_DOMAIN= "reactcrudwithfirebase-b3ecc.firebaseapp.com"
// REACT_APP_FIREBASE_DATABASE_URL="https://reactcrudwithfirebase-b3ecc-default-rtdb.europe-west1.firebasedatabase.app"
// REACT_APP_FIREBASE_PROJECT_ID= "reactcrudwithfirebase-b3ecc"
// REACT_APP_FIREBASE_STORAGE_BUCKET ="reactcrudwithfirebase-b3ecc.appspot.com"
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID= "68357565053"
// REACT_APP_FIREBASE_APP_ID="1:68357565053:web:a2f75cd4514e339c57df14"
// REACT_APP_FIREBASE_MEASUREMENT_ID="G-W7544L3ZRT"


// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)