const { firestore } = require('../firebaseDB');

const getSellperNgud = async (req, res, next) => {

    const type = "ngud";
    const number = req.query.number.toString();

    let day_start;
    let day_end;
    let sell_per_ngud = [];


    console.log("chart  ",number)

    try {

        if (type === "ngud") {

            await firestore.collection('ngud')
                .doc(number)
                .get()
                .then((doc) => {
                    day_start = new Date(doc.data().start)
                    day_end = new Date(doc.data().end)
                });
            
            

            //สร้าง Array วันที่ในงวดนั้นๆ
            for (let i = day_start.getDate(); i <= day_end.getDate(); i++) {
                sell_per_ngud.push(
                    {
                        day: i,
                        qty: 0,
                        total_price: 0
                    }
                )
            }

            console.log(sell_per_ngud);

            const invoice = await firestore.collection('invoices').where("userid", "!=", "admin").get()
            if (invoice.empty) {
                console.log("ไม่มีข้อมูล")
            } else {

                await invoice.docs.forEach(doc => {

                    let _day = doc.data().date.toDate().getDate();
                    let _qty = doc.data().quantity;
                    let _price = doc.data().totalprice;

                    console.log("invoice  date", _day)

                    sell_per_ngud = sell_per_ngud.map(element => element.day === _day ?
                        {
                            ...element,
                            qty: element.qty + _qty,
                            total_price: element.total_price + _price
                        }
                        : element);
                });
                console.log(sell_per_ngud);
                res.status(200).send(sell_per_ngud);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSellperNgud
}