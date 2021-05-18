const { firestore } = require('../firebaseDB');
const moment = require('moment')
moment.locale('th');

const getSellperNgud = async (req, res, next) => {

    const type = "ngud";
    const number = req.query.number.toString();

    let day_start;
    let day_end;
    let sell_per_ngud = [];



    try {

        if (type === "ngud") {

            if (number != "") {
                await firestore.collection('ngud')
                    .doc(number)
                    .get()
                    .then((doc) => {
                        day_start = new Date(doc.data().start)
                        day_end = new Date(doc.data().end)
                    });
            }
            else {
                const ngud_DB = await firestore.collection('ngud').orderBy("end", "desc").get();
                await ngud_DB.docs.forEach((doc,index) => {
                    
                    if(index == 0) {
                        // console.log(index)
                        day_start = new Date(doc.data().start)
                        day_end = new Date(doc.data().end)
                    }
                    
                });
            }


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
    

            const invoice = await firestore.collection('invoices').where("userid", "!=", "khohuai").get()
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
const getIncome = async (req,res) =>{
    console.log("in")
    let data = [];
    try {
        await firestore.collection("ngud").where("check_prize", "==", true).get()
            .then((docs) => docs.forEach((doc) => {
                data.push(
                    {
                        ngud: doc.id, 
                        total_lottery: doc.data().total_lottery,
                        total_onhand: doc.data().total_onhand,
                        cost_buy: doc.data().cost_buy,
                        end: new Date(doc.data().end),
                        name: moment(new Date(doc.data().end)).format('LL'),
                        income: doc.data().income,
                        spend_reward: doc.data().spend_reward
                    }
                )
            }))
    } catch (error) {
        
    }
    res.send(data);
}

module.exports = {
    getSellperNgud,
    getIncome
}