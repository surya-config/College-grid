  
import { Input } from "@material-ui/core";
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCjeNfvPi_sgW_I34JTIwT0JyeP-wSQg9U",
    authDomain: "college-grid.firebaseapp.com",
    projectId: "college-grid",
    storageBucket: "college-grid.appspot.com",
    messagingSenderId: "233845450285",
    appId: "1:233845450285:web:ba31ecbe9f7bf5f8e37aa4",
    measurementId: "G-CZY8VF1MXV"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;




