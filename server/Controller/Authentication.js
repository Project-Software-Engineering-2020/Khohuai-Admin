const { auth, firestore } = require("../firebaseDB")

const sign = require("jwt-encode")
const secret = 'secret';


const signin = async (req, res) => {
    const _email = req.body.email;
    const _password = req.body.password;
 
    try {
        auth.signInWithEmailAndPassword(_email, _password)
        .then(async (result) => {
 
            let user = {};

            await firestore.collection("users").doc(result.user.uid)
            .get().then((doc) => {
                user = {
                    uid :doc.data().uid,
                    // firstname = doc.data().firstname,
                    // lastname = doc.data().lastname,
                    displayName : doc.data().displayName,
                    // photoURL = doc.data().photoURL,
                    email : doc.data().email,
                    role : doc.data().role,
                    status : doc.data().status,
                    exp: ((Date.now() / 1000) + (60 * 60))
                    // provider = doc.data().provider,
                    // id = uid,
                    // token = jwt.sign({id},"jwtSecret")
                }
                const jwt = sign(user,secret)
        
                res.status(200).send(jwt)
                // console.log("Song Laewna +++++++++++++++++")
                // res.status(200).send(user);
                    })
            }).catch((error) => {
  
                res.status(201).send(error.code);
            })
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    signin
}