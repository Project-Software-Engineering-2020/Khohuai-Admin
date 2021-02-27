const firebase = require('firebase');
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("../hi-chon-firebase-adminsdk-9pav9-4cf41da28a.json");

const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://hi-chon.firebaseio.com"
});

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);


// const firebaseApp = firebase.initializeApp(config.firebaseConfig);

//firestore
const firestore = firebaseApp.firestore();

//email&password login
const auth = firebaseApp.auth();

//google login 
const googleProvider = new firebase.auth.GoogleAuthProvider();

//facebook login
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('user_birthday');

// //firebase storage
// const storage = firebase.storage();

module.exports = {
    firebaseApp,
    firestore,
    auth,
    googleProvider,
    facebookProvider,
}
