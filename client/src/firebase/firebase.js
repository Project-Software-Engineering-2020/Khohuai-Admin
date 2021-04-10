import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";
// import firebaseConfig from './config';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDFVW8oB9jThgn0V_dBOlwlSw7xXOIGEMk",
  authDomain: "khohuai-v2.firebaseapp.com",
  databaseURL: "https://khohuai-v2-default-rtdb.firebaseio.com",
  projectId: "khohuai-v2",
  storageBucket: "khohuai-v2.appspot.com",
  messagingSenderId: "644654390402",
  appId: "1:644654390402:web:7d6bb217c4a6daff64e89b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();

//email&password login
const auth = firebaseApp.auth();

//google login 
const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

//facebook login
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('user_birthday');

//firebase storage
const storage = firebase.storage();

export {
    firebaseApp,
    firestore,
    auth,
    googleProvider,
    facebookProvider,
    storage
}