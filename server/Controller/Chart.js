const { firestore } = require('../firebaseDB');

const getSellperNgud = async (req, res, next) => {

    const type = "ngud";
    const number = req.query.number.toString();

    let _ngud = [];
    let day_start;
    let day_end;
    let invoiceArray = [];
    let sell_per_ngud = [];
    let inDay;
    let new_array = [];

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

            const invoice = await firestore.collection('invoices').get()
            if (invoice.empty) {
                console.log("ไม่มีข้อมูล")
            } else {

                await invoice.docs.forEach(doc => {

                    let _day = doc.data().date.toDate().getDate();
                    let _qty = doc.data().quantity;
                    let _price = doc.data().totalprice;

                    sell_per_ngud = sell_per_ngud.map(element => element.day === _day ?
                        {
                            ...element,
                            qty: element.qty + _qty,
                            total_price: element.total_price + _price
                        }
                        : element);
                });

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