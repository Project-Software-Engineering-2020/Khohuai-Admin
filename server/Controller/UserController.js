const { firestore } = require('../firebaseDB'); 

const getAllUser = async (req, res, next) => {
    let userArray = []
    try {
        const user = await firestore.collection('users').get()
        if (user.empty) {
            res.status(400).send("No user in record")
        } else {
            user.docs.forEach((doc,index) => {
                userArray.push({
                    i: index+1,
                    id: doc.id,
                    displayName: doc.data().displayName,
                    email: doc.data().email,
                    firstname: doc.data().firstname,
                    lastname: doc.data().lastname,
                    phone: doc.data().phone
                });
            });
            res.status(200).send(userArray);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUser
}