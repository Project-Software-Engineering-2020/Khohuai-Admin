const { firestore } = require('../firebaseDB');

const getSellperNgud = async (req, res, next) => {

    const type = req.query.type;
    const number = req.query.number;

    let _ngud = [];
    let day_start = 0;
    let day_end = 0;
    let invoiceArray = [];
    let sell_per_ngud = [];
    let inDay;
    let new_array = [];

    try {

        if (type === "ngud") {

            const ngud = await firestore.collection('ngud').orderBy("end", "desc").get()
            await ngud.docs.forEach((doc, index) => {

                if (doc.id === number) {
                    day_start = doc.data().start.toDate().getDate();
                    day_end = doc.data().end.toDate().getDate();
                }

            });

            //สร้าง Array วันที่ในงวดนั้นๆ
            for (i = day_start; i <= day_end; i++) {
                sell_per_ngud.push(
                    {
                        day: i,
                        qty: 0,
                        total_price: 0
                    }
                )
            }

            const invoice = await firestore.collection('invoices').orderBy("date", "desc").get()
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
            if(type === "month") {

            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSellperNgud
}