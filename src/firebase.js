import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAI17mbAy1fec-V8JI6ZLo98m4Rp1l9eL0",
   authDomain: "slack-app-ed94f.firebaseapp.com",
   projectId: "slack-app-ed94f",
   storageBucket: "slack-app-ed94f.appspot.com",
   messagingSenderId: "560918760790",
   appId: "1:560918760790:web:2a3ae3f8d608a1f20edaf7",
   measurementId: "G-QTCD75XDMF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
