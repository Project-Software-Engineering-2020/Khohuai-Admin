// const firebase = require('firebase');
// const firebaseAdmin = require("firebase-admin");

// const serviceAccount = require("./khohuai-v2-firebase-adminsdk-olov5-6c52cf26ac.json");

// const firebaseApp = firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: "https://khohuai-v2-default-rtdb.firebaseio.com",
//   storageBucket: "gs://khohuai-v2.appspot.com"
// });

// //firestore
// const firestore = firebaseApp.firestore();

// //email&password login
// const auth = firebaseApp.auth();

// //google login 
// const googleProvider = new firebase.auth.GoogleAuthProvider();

// //facebook login
// const facebookProvider = new firebase.auth.FacebookAuthProvider();
// facebookProvider.addScope('user_birthday');

// // //firebase storage
// const storage = firebaseApp.storage();
// const bucket = storage.bucket();

// module.exports = {
//     firebaseApp,
//     firestore,
//     auth,
//     googleProvider,
//     facebookProvider,
//     storage,
//     bucket
// }


const firebase = require('firebase');
const config = require('./config');
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./khohuai-v2-firebase-adminsdk-olov5-6c52cf26ac.json");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://khohuai-v2-default-rtdb.firebaseio.com",
  storageBucket: "gs://khohuai-v2.appspot.com"
});

const firebaseApp = firebase.initializeApp(config.firebaseConfig);

//firestore
const firestore = admin.firestore();

//email&password login
const auth = firebaseApp.auth();

//google login 
const googleProvider = new firebase.auth.GoogleAuthProvider();

//facebook login
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('user_birthday');

// //firebase storage
const storage = admin.storage();
const bucket = storage.bucket();

module.exports = {
    firebaseApp,
    firestore,
    auth,
    googleProvider,
    facebookProvider,
    admin,
    storage,
    bucket
}

// const firebase = require('firebase');
// const firebaseAdmin = require("firebase-admin");

// const serviceAccount = require("./khohuai-v2-firebase-adminsdk-olov5-6c52cf26ac.json");

// const firebaseApp = firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: "https://khohuai-v2-default-rtdb.firebaseio.com",
//   storageBucket: "gs://khohuai-v2.appspot.com"
// });

// //firestore
// const firestore = firebaseApp.firestore();

// //email&password login
// const auth = firebaseApp.auth();

// //google login 
// const googleProvider = new firebase.auth.GoogleAuthProvider();

// //facebook login
// const facebookProvider = new firebase.auth.FacebookAuthProvider();
// facebookProvider.addScope('user_birthday');

// // //firebase storage
// const storage = firebaseApp.storage();
// const bucket = storage.bucket();

// module.exports = {
//     firebaseApp,
//     firestore,
//     auth,
//     googleProvider,
//     facebookProvider,
//     storage,
//     bucket
// }
