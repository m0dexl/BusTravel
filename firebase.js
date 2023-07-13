import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEtTV1ilkfy5IdES3GCdmjPKJmb83jtzg",
  authDomain: "bustravel-4431b.firebaseapp.com",
  projectId: "bustravel-4431b",
  storageBucket: "bustravel-4431b.appspot.com",
  messagingSenderId: "210272273417",
  appId: "1:210272273417:web:76a07b1edf84e92dc464d8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
