const { firestore } = require('../firebaseDB'); 


const getAllLottery = async (req, res, next) => {
    let lotteryArray = []

    console.log("get Data")
    try {
        const lottery = await firestore.collection('LotteriesAvailable').get()
        if (lottery.empty) {
            res.status(400).send("No lottery in record")
        } else {
            lottery.docs.forEach(doc => {
                //push into array
                // const lot = new Lottery(
                //     doc.id,
                //     doc.data().photoURL,
                // )
                lotteryArray.push({
                    id: doc.id,
                    photoURL: doc.data().photoURL,
                    stock: doc.data().stock
                });
            });
            res.status(200).send(lotteryArray);
            console.log(lotteryArray)
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllLottery
}