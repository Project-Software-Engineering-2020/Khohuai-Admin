import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";
// import firebaseConfig from './config';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBN3QqOyoNoDiX5prLxCSKN7Q5k1i3cjGg",
  authDomain: "khohuai-admin.firebaseapp.com",
  projectId: "khohuai-admin",
  storageBucket: "khohuai-admin.appspot.com",
  messagingSenderId: "108256796724",
  appId: "1:108256796724:web:41996f0a36c1a496bf2a61",
  measurementId: "G-FX5WHX5ZPH"
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