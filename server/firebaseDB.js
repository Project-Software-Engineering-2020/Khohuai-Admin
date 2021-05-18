const firebase = require('firebase');
const firebaseAdmin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "khohuai-v2",
  private_key_id: "e5d591bbafd20dcad2918bd1d41b2e7511258d81",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRaQCigg2jBwTe\npmvC+N6NlPMV/4qkFHoPyfnkqbAVMzkaertyr0FuJTYZfeYb0Vbz+aDZTV8iCKcq\nRaQ2iVHe/iUXYr95hA3Lx/2PlJ761xSF4liXX3RJ5JZXlEQq9dJXq2aXi+qmiOoB\n593IFMu1mxViSOTinl0GU/DurIkf8RF1gR7dwHlxgz8qRTKhUc0lzrfI4si7tapj\nsYb2/3SAIXxfLxV2iXGgQ8GexG5x7zhS1ZLFAk9bvBgGvvWSkeCZ/6c1fbhFpqce\nT4ZKr+CfF7WIsB+D0bDvTsYCKKAHNqFsGAn1CqnYH6CJedxya00cM7ZTyC1g8PBy\ns2eA3mbjAgMBAAECggEAOFU7EzoaKV4HQ3Cqz+KVablaQVv6LJ3oOeSwJKeemV/6\nT+lbZE9EJHVTE6YkNwOvUZ6Uc4sXf3pltKk9OImTh7XizcAKWPvRUnC8qVrVCm23\nvDSXyLEIvrXJjs1YaWJJpoA3Ix/n/LOPIMTgtWplDwqxSp3d2nOqq1BqxzRdfVtT\n/gwmS3ITWj5NLkMqPgFXSqKCr//00qtOLgtIdc9TC3bIbrRZ55PO96oEXRm4VJKc\nK/VvIgCjYEmtCIkTIdja7BbAKNtJme+HqqBp3hJdiIIOZ/O8Prg3KHYb4m7wA5nC\niqvU15IhmXdWJstblTtmaW9B8aZCxOqUgPYkRcj43QKBgQDMjTRec+gtNGHWGXr3\nAwfPZ2SS9QEI4dZ6iTkxQ3CvJxjwKhKifYV06LZKlek5xi9IDxd0Om0gfPVbSms/\nXv0XwrXgTqsQh4XG4tsiYXZqZ8tCf8ixTLwb8vB0yZyQDWWVZlG3j6SSKi477fcI\n0iCQxISKFn4NtIHnSxfMkqUkTQKBgQC1+8Nwainw71G0CVHxmRSS8Ns7AoyTahdm\nkd+dLFPxkYossn6I1+A+KQ+j3K1aux3g5xHPwlk8g104rsZEWeLjmgCl7fEi5KDx\nZEtu/gc3tAiL//6NvrCSmClrOWqBy979fR4F2kkBsp8/EUY26WDJG/D66i3aIUVd\nKPj8VlUP7wKBgQCvG0Y0gVbFs+z5InDwmkiKVYF0iIatOt+noGc0c/44AulHV00C\nix+/OCQtb23rhmwdbMXwOsAGqtJDp05uPnu9ZnLaJZ4tlUaBPtzG7tY3Osl3EPsW\nRJFX/722zIzZiI5oueHEmRQSCEfyB8GNbIxyQbkQmTapttfpz4/9EaCLlQKBgEkW\nmVK/wKJ8a3MEPz3p/kJZq6LSjkTyWf2e3pFQaVJe4oC7G2i4Ut6EPTzRd2o2NnTK\nOPQZGR/dnoYSY5y2ARLqGhKKMsuRyTXJ0yX7rkhn7PrVUJX7HQ1zQUdIIweIKsHi\nCznMhn/BDoYU2P9a0b1TlIAhp1KxBBu7ReyKe9VPAoGABCBZH38kU7gcE2oTO80w\njf2XiWnqX0cMF8ScxPcmijQrepO7BDUnFWu9X+LIvOXGSS9Z699Z6s3jLRVuU8+6\nLJvVwNASLL7I09azrWsXQRoQrxEBuwoUYEDs30puWjpfKZP1xWXcPdo8M/ZBwMVI\nqcLl3U7/+gLkOlA/WwADIDw=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-olov5@khohuai-v2.iam.gserviceaccount.com",
  client_id: "114904195817107777594",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-olov5%40khohuai-v2.iam.gserviceaccount.com"
}

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://khohuai-v2-default-rtdb.firebaseio.com",
  storageBucket: "gs://khohuai-v2.appspot.com"
});

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
