const { firestore } = require('../firebaseDB');
// const multer = require("multer");

// const upload = multer({
//     // storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//     }
// });

const getCurrentNgud = async () => {

    let ngud = {}

    try {
        const ngudDB = await firestore.collection("ngud").get();

        ngudDB.docs.forEach((doc) => {
            ngud = {
                ...ngud,
                id: doc.id,
                open: false,

            }
        })

        return ngud;

    } catch (error) {
        console.log(error)
    }
}


const getAllLottery = async (req, res, next) => {
    let lotteryArray = []

    console.log("get Data")
    try {
        const ngud = await getCurrentNgud();

        // if (ngud.open === true) {

        const lottery = await firestore.collection('lottery').get()
        if (lottery.empty) {
            res.status(400).send("No lottery in record")
        } else {
            lottery.docs.forEach(doc => {
                lotteryArray.push({
                    id: doc.id,
                    photoURL: doc.data().photoURL,
                    stock: doc.data().photoURL.length,
                });
            });
            res.status(200).send(lotteryArray);
        }

    } catch (error) {
        console.log(error);
    }
}


const insertLottery = async (req, res) => {

    const number = req.body.number;
    const image = req.body.image_boss;
    let ngud = req.body._ngud
    ngud = ngud.toString()
    

    let total_lottery = 0;
    let total_onhand = 0;
    let haveInDoc = true;
    let new_lottery;
    let _photoURL = [];

    try {
    
        await firestore.collection("lottery").doc(number)
            .get().then((doc) => {

                if (doc.exists) {
                    console.log("มีข้อมูล")
                    haveInDoc = true;
                    new_lottery = doc.id;
                    _photoURL = doc.data().photoURL;

                }
                else {
                    console.log("ไม่มีข้อมูล")
                    haveInDoc = false;
                }


            });

        if (!haveInDoc) {
            //insert ครั้งแรก
            await firestore.collection("lottery").doc(number)
                .set({
                    photoURL: image,
                    ngud: ngud
                });
            console.log("ครั้งแรก")

            await firestore.collection("ngud").doc(ngud).get().then((doc) => {
                total_lottery = doc.data().total_lottery;
                total_onhand = doc.data().total_onhand;
            })

            
            total_lottery = total_lottery + image.length;
            total_onhand = total_onhand + image.length;

          

            await firestore.collection("ngud").doc(ngud).update(
                {
                    total_lottery: total_lottery,
                    total_onhand: total_onhand
                }
            )

            res.status(200).send("success");

        }
        else {
            console.log("เพิ่มสต็อก");

            let updatedLottery = [..._photoURL, ...image];

            await firestore.collection("lottery").doc(number).update({
                photoURL: updatedLottery
            })

            await firestore.collection("ngud").doc(ngud).get().then((doc) => {
                total_lottery = doc.data().total_lottery;
                total_onhand = doc.data().total_onhand;
            })

            total_lottery = total_lottery + image.length;
            total_onhand = total_onhand + image.length;


            await firestore.collection("ngud").doc(ngud).update(
                {
                    total_lottery: total_lottery,
                    total_onhand: total_onhand
                }
            )


            res.status(200).send("success");
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllLottery,
    insertLottery,
}