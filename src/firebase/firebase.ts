import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: ""
};

firebase.initializeApp(config);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const db = firebase.database();

export { db, auth, googleAuthProvider };
