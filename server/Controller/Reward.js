const { firestore } = require('../firebaseDB');

const getAllUserWin = async (req, res) => {

    let ngud = [];
    let data = [];

    try {

        const ngudDB = await firestore.collection('ngud').orderBy("end", "desc").get()
        await ngudDB.docs.forEach(doc => {
            ngud.push({
                ngud: doc.id,
                end: doc.data().end,
                start: doc.data().start,
            })
        });

        await firestore.collection("rewards").where("ngud", "==", ngud[0].ngud).get().then(async (docs) => {

            await docs.forEach((doc) => {
                data.push(
                    {
                        id: doc.id,
                        lottery: doc.data().lottery,
                        uid: doc.data().uid,
                        success: doc.data().success,
                        win_total: doc.data().win_total,
                        win_chart: doc.data().win_chart,
                        win_amount: doc.data().win_amount,
                        update_date: doc.data().update_date.toDate()

                    })
            })
            res.send(data);
        })


    } catch (error) {
        console.log(error)
    }
}

const getDetailUserReward = async (req, res) => {

    const id = req.params.id;
    let data = []

    await firestore.collection("rewards").doc(id).get().then((doc) => {
        console.log(doc.data())

        data = {
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
            slip:doc.data().slip
        }
        
    })
    res.send(data);
}

const uploadSlip = async (req,res)  => {

    const imageurl = req.body.im;
    const id = req.body.id; 
    const date = new Date

    await firestore.collection("rewards").doc(id).update(
        {
            success:true,
            update_date: date,
            slip: imageurl
        }
    ).then(res => {
        console.log("update slip", res)
    })
    res.send("success")
}

module.exports = {
    getAllUserWin,
    getDetailUserReward,
    uploadSlip
}