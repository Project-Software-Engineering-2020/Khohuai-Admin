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
const rewardOfUser = async (req,res) => {

    let data = [];
    const id = req.params.id;

    await firestore.collection("rewards").where("uid","==",id).get().then((docs) => docs.forEach((doc) => {
        data.push({
            id: doc.id,
            lottery: doc.data().lottery,
            win_total: doc.data().win_total,
            uid: doc.data().uid,
            win_chart: doc.data().win_chart,
            win_amount: doc.data().win_amount,
            success: doc.data().success,
            update_date: doc.data().update_date.toDate(),
            create_date: doc.data().create_date.toDate(),
            ngud: doc.data().ngud,
            book_name: doc.data().book_name,
            book_number: doc.data().book_number,
            book_provider: doc.data().book_provider,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname
        })
    }))

    res.send(data)
}

module.exports = {
    getAllUser,
    rewardOfUser
}