const { auth, firebaseApp, admin, firestore } = require("../firebaseDB")
const User = require("../Models/User");
const firebase = require('firebase');
// const jwt = require('jsonwebtoken')
// let refreshToken = [];

const signin = async (req, res) => {
    const _email = req.body.email;
    const _password = req.body.password;
    // console.log(_email)
    try {
        auth.signInWithEmailAndPassword(_email, _password)
            .then((result) => {
                // console.log("KUY+++++++++++++++++++++++++++++++")
                // console.log(result);
                const user = firestore.collection("users").doc(result.user.uid);
                user.get().then((doc) => {
                    const user = new User(
                        uid = doc.data().uid,
                        firstname = doc.data().firstname,
                        lastname = doc.data().lastname,
                        displayName = doc.data().displayName,
                        photoURL = doc.data().photoURL,
                        email = doc.data().email,
                        role = doc.data().role,
                        status = doc.data().status,
                        provider = doc.data().provider,
                        // id = uid,
                        // token = jwt.sign({id},"jwtSecret")
                    )
                    console.log("Song Laewna +++++++++++++++++")
                    res.status(200).send(user);
                    })
            }).catch((error) => {
                console.log("Chon---------------------------------")
                res.status(201).send(error.code);
            })
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    signin
}