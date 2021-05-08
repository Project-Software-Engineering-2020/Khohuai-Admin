const { firestore } = require('../firebaseDB');
const Axios = require('axios');
const moment = require('moment')
moment.locale('th');

const getNgud = async (req, res, next) => {
    let data = [];
    try {
        const ngud = await firestore.collection('ngud').orderBy("end", "desc").get()
        await ngud.docs.forEach(doc => {

            data.push({
                ngud: doc.id,
                name: moment(new Date(doc.data().end)).format('LL'),
                end: new Date(doc.data().end),
                start: new Date(doc.data().start),
                total_lottery: doc.data().total_lottery,
                total_onhand: doc.data().total_onhand,
                open: doc.data().open,
                check_prize: doc.data().check_prize
            })
        });
        res.send(data);

    } catch (error) {
        console.log(error);
    }
}

const createNgud = (req, res) => {
    const data = req.body;


    console.log(data);

    try {
        firestore.collection("ngud").doc(data.ngud_id).set(data)
    } catch (err) {
        console.log(err);
    }
}

const createInvoice = async (data, doto, idUser, totalItem) => {

    const charge = data;
    const Mycart = doto;
    const uid = idUser;
    const date = new Date();
    let lottery_instock = [];
    let item_buy = doto;
    let ngud = [];

    try {
        const ngudDB = await firestore.collection('ngud').orderBy("end", "desc").get()
        await ngudDB.docs.forEach(doc => {
            ngud.push({
                ngud: doc.id,
                end: doc.data().end,
                start: doc.data().start,
                total_onhand: doc.data().total_onhand
            })
        });


        if (charge.status === "successful") {

            let userData = [];

            await firestore.collection("users").doc(uid).get().then((doc) => {
                userData.push({
                    book_name: doc.data().book_name,
                    book_number: doc.data().book_number,
                    book_provider: doc.data().book_provider,
                    firstname: doc.data().firstname,
                    lastname: doc.data().lastname
                })
            })

            // const item_bought = await romoveInStock(Mycart);
            let lottery_instock = [];
            // let item_buy = [];
            let cut_stock = [];

            //ดึงข้อมูล stock
            const instock = await firestore.collection("lottery").get()
            instock.docs.forEach(item => {
                lottery_instock.push(
                    {
                        number: item.id,
                        lottery_img: item.data().photoURL,
                    }
                );
            });


            let enough = true;

            let buy = [];

            console.log(lottery_instock)
            let lottery_each_number = [];
            for (i = 0; i < item_buy.length; i++) {

                for (j = 0; j < lottery_instock.length; j++) {


                    if (item_buy[i].id === lottery_instock[j].number) {

                        lottery_each_number = lottery_instock[j].lottery_img;

                        if (lottery_instock[j].lottery_img.length >= item_buy[i].qty) {

                            let target_lottery = [];

                            let img = [];
                            let buff = [];

                            for (k = 1; k <= item_buy[i].qty; k++) {

                                target_lottery = lottery_instock[j].lottery_img[k]

                                img.push(target_lottery);


                                lottery_each_number.pop(target_lottery);

                                console.log(lottery_each_number.length);
                                console.log(lottery_instock[j].number)

                                if (lottery_each_number.length == 0) {
                                    await firestore.collection("lottery").doc(lottery_instock[j].number).delete()
                                }
                                else {
                                    await firestore.collection("lottery").doc(lottery_instock[j].number)
                                        .update({
                                            photoURL: lottery_each_number
                                        })
                                }


                            }

                            buy.push(
                                {
                                    number: item_buy[i].id,
                                    lottery: img,
                                    qty: item_buy[i].qty,
                                    status: false,
                                    prize: [""]
                                }
                            );

                        }
                        else {

                        }
                    }
                    continue;
                }
                continue;
            }
            console.log(buy);

            console.log("ngud   ", ngud)

            let datainsert = {
                charge_id: charge.id,
                userid: uid,
                lottery: buy,
                date: date,
                totalprice: charge.amount / 100,
                quantity: buy.length,
                ngud: ngud[0].ngud,
                ngud_date: ngud[0].end,
                book_name: userData[0].book_name,
                book_number: userData[0].book_number,
                book_provider: userData[0].book_provider,
                firstname: userData[0].firstname,
                lastname: userData[0].lastname
            }

            console.log("dataInsrt  ", datainsert);

            const invoice = await firestore.collection("invoices").doc().set(datainsert).then((res) => {
                console.log("invoice เพิ่มแล้ว")

                //ลบ item ในตะกร้า
                Mycart.map((item) => {
                    firestore.collection("users").doc(uid)
                        .collection("cart").doc(item.id).delete()
                        .then((success) => { console.log("clear ตะกร้าแล้ว") })
                        .catch((err) => console.log("ลบไม่ได้", err));
                })
            })
            await firestore.collection("ngud").doc(ngud[0].id).update({ total_onhand: ngud.total_onhand - totalItem })
            // await romoveInStock()
        }
    } catch (err) {
        console.log(err)
    }
}

const check_prize = async (req, res) => {

    console.log("ตรวจรางวัล")
    let ngud_id = "01";
    let Prizes = [];
    let RunningNumbers = [];
    let invoices = [];
    let list = [];
    let win = [];
    let reward = 0;
    let lottery_invoice = [];


    let AllLottery = [];

    await firestore.collection("lottery").get((docs) => {
        docs.forEach((doc) => {
            AllLottery.push({
                id: doc.id,
                ngud: doc.data().ngud,
                photoURL: doc.data().photoURL
            })
        })
    })

    let idUser = "admin";
    let data = "admin";

    let Tcart = [];
    let totolPrice = 0;
    let total_item = 0;

    await AllLottery.map(async (lot) => {

        // await lot.photoURL

        await Tcart.push({
            lottery: lot.photoURL,
            number: lot.id,
            prize: [""],
            qty: lot.photoURL.length,
            status: false
        })
        totolPrice += (lot.photoURL.length * 80);
        total_item += lot.photoURL.length;
    })

    console.log(Tcart);

    // await createInvoice(data, Tcart, idUser, total_item);
    let data_insert = {
        charge_id: "admin",
        userid: "admin",
        lottery: Tcart,
        date: new Date(),
        totalprice: totolPrice,
        qty: total_item,
        ngud: ngud_id,
        ngud_date: ngud_id,
        book_name: "admin",
        book_number: "admin",
        book_provider: "admin",
        firstname: "admin",
        lastname: "admin"
    }

    console.log("dataInsrt  ", data_insert);

    const invoice = await firestore.collection("invoices").doc().set(data_insert).then((res) => {
        console.log("invoice เพิ่มแล้ว")

        // //ลบ item ในตะกร้า
        // Mycart.map((item) => {
        //     firestore.collection("users").doc(uid)
        //         .collection("cart").doc(item.id).delete()
        //         .then((success) => { console.log("clear ตะกร้าแล้ว") })
        //         .catch((err) => console.log("ลบไม่ได้", err));
        // })
    })

    await firestore.collection("ngud").doc(ngud_id).update(
        {
            total_onhand: 0,
            total_lottery: 0,
            open: false
        })


    await Axios.get("https://lotto.api.rayriffy.com/latest").then((res) => {
        Prizes = res.data.response.prizes;
        RunningNumbers = res.data.response.runningNumbers;
    })

    const invoice_DB = await firestore.collection("invoices").get()
    await invoice_DB.docs.forEach(doc => {
        invoices.push({
            id: doc.id,
            lottery: doc.data().lottery,
            uid: doc.data().userid
        })
    });

    await invoices.forEach(async (invoice, i) => {

        lottery_invoice = [];

        invoice.lottery.forEach(async (your_lottery, index) => {

            win = [];
            reward = 0;

            // รางวัลที่ 1 ถึง 5
            Prizes.map((prize) => {
                prize.number.map((number) => {

                    if (number === your_lottery.number) {

                        win.push(prize.name);
                        reward += parseInt(prize.reward);

                    }

                    return [];
                })
                return [];
            })

            var myLot = parseInt(your_lottery.number);
            var my3FirstLot = parseInt(myLot / 1000);
            var my3LastLot = myLot % 1000;
            var my2LastLot = myLot % 100;

            RunningNumbers.map((run) => {

                run.number.map((number) => {

                    var numberInt = parseInt(number);
                    //รางวัลเลขหน้า 3 ตัว
                    if (numberInt === my3FirstLot && run.name === "รางวัลเลขหน้า 3 ตัว") {

                        win.push(run.name)
                        reward += parseInt(run.reward);
                    }

                    //รางวัลเลขท้าย 3 ตัว
                    if (numberInt === my3LastLot && run.name === "รางวัลเลขท้าย 3 ตัว") {

                        win.push(run.name)
                        reward += parseInt(run.reward);
                    }

                    //รางวัลเลขท้าย 2 ตัว
                    if (numberInt === my2LastLot && run.name === "รางวัลเลขท้าย 2 ตัว") {

                        win.push(run.name)
                        reward += parseInt(run.reward);
                    }
                    return [];
                })
                return [];

            })

            //มีถูกรางวัลไหนบ้าง
            if (win.length === 0) {
                //ไม่ถูกซักรางวัล
                lottery_invoice.push(
                    {
                        number: your_lottery.number,
                        status: true,
                        prize: ['ไม่ถูกรางวัล'],
                        rewards: reward,
                        qty: your_lottery.qty,
                        lottery: your_lottery.lottery,
                        win: false
                    }
                )
                firestore.collection("invoices").doc(invoice.id).update(
                    {
                        lottery: lottery_invoice,
                        result: true,
                        win: false,
                        check_date: new Date
                    }
                )

            }
            else {
                //ถูกรางวัล
                lottery_invoice.push(
                    {
                        number: your_lottery.number,
                        status: true,
                        prize: win,
                        rewards: reward,
                        qty: your_lottery.qty,
                        lottery: your_lottery.lottery,
                        win: true
                    }
                )
                firestore.collection("invoices").doc(invoice.id).update(
                    {
                        lottery: lottery_invoice,
                        result: true,
                        win: true,
                        check_date: new Date
                    }
                )

            }
        })

    })

    await createReward();
    res.status(200).send("success");

}

const createReward = async () => {


    // invoicesDB = invoicesDB.where("win", "==", true)

    let invoices = [];
    let user_win = [];
    let dataWin = [];

    try {
        await firestore.collection('invoices').get()
            .then(async (docs) => docs.forEach(async doc => {

                console.log("uid = == ", doc.data().userid);

                if (doc.data().win === true) {
                    await invoices.push({
                        id: doc.id,
                        lottery: doc.data().lottery,
                        uid: doc.data().userid,
                        ngud_date: doc.data().check_date,
                        ngud: doc.data().nguad,
                        win: doc.data().win,
                        book_name: doc.data().book_name,
                        book_number: doc.data().book_number,
                        book_provider: doc.data().book_provider,
                    })

                    await user_win.push(doc.data().userid);
                }



            }));

        console.log("invoices = ", invoices);

        console.log(user_win)

        //remove duplicate
        user_win = [...new Set(user_win)];


        user_win.map(async (userid) => {

            console.log("uid   ", userid)
            let book_name = ""
            let book_number = ""
            let book_provider = ""

            dataWin = [];

            await invoices.map(async (invoice) => {

                if (invoice.uid === userid) {

                    await invoice.lottery.map(async (item_win) => {

                        if (item_win.win === true) {

                            book_name = invoice.book_name;
                            book_number = invoice.book_number;
                            book_provider = invoice.book_provider;

                            let inArr = false;

                            if (dataWin.length > 0) {

                                // ตรวจสอบว่าเคยมี แล้วหรือยัง 
                                await dataWin.map((item) => {
                                    if (item.number === item_win.number) {

                                        return inArr = true
                                    }
                                    else {
                                        return inArr = false
                                    }
                                })

                            }
                            else {
                                //เพิ่มลง Arr ครั้งแรก
                                inArr = false;
                            }

                            dataWin =

                                inArr ?

                                    dataWin.map((w) =>

                                        w.number === item_win.number ?
                                            {
                                                ...w,
                                                qty: w.qty + item_win.qty,
                                                lottery: [...w.lottery, ...item_win.lottery]
                                            }
                                            :
                                            w
                                    )

                                    :

                                    [...dataWin,
                                    {
                                        number: item_win.number,
                                        lottery: item_win.lottery,
                                        prize: item_win.prize,
                                        qty: item_win.qty,
                                        reward: item_win.rewards,
                                        win: item_win.status
                                    }
                                    ]

                        }
                        return
                    })
                }
                return

            })

            console.log("data", dataWin);

            let total = 0;
            let chage = 0;
            let amount = 0;

            await dataWin.map((d) => {

                total = total + (d.reward * d.qty);
                chage = (total / 100) * 1.5;
                amount = total - chage;
            })

            await firestore.collection("rewards").doc().set(
                {
                    lottery: dataWin,
                    win_total: total,
                    win_chart: chage,
                    win_amount: amount,
                    success: false,
                    create_date: new Date,
                    update_date: new Date,
                    uid: userid,
                    book_name: book_name,
                    book_number: book_number,
                    book_provider: book_provider,
                    ngud: "01"
                }
            );

            await firestore.collection("ngud").doc("01").update({check_prize:true})
        })
    }
    catch (err) {
        console.log(err)
    }

}



// const createReward = async () => {

//     const invoicesDB = await firestore.collection('invoices').where("win", "==", true);
//     let invoices = [];

//     try {
//         await invoicesDB.get().then((docs) => docs.forEach(doc => {

//             invoices.push({
//                 id: doc.id,
//                 lottery: doc.data().lottery,
//                 uid: doc.data().userid,
//                 ngud_date: doc.data().check_date,
//                 ngud: 01,
//                 win: doc.data().win
//             })
//         }));

//         invoices.map(async (invoice) => {

//             // let winReward = []

//             let uid = invoice.uid;
//             let ngud = 01

//             // console.log(invoice)

//             invoice.lottery.map(async (lot) => {

//                 if (lot.win === true) {

//                     console.log(lot.prize)

//                     let myRewardDB = undefined;

//                     myRewardDB = await firestore.collection('rewards')
//                     myRewardDB = await myRewardDB.where("ngud", "==", ngud)
//                     myRewardDB = await myRewardDB.where("uid", "==", uid)

//                     await myRewardDB.get().then(async (doc) => {

//                         console.log("check", doc.docs)


//                         if (doc.docs.length != 0) {

//                             console.log("have data of user in reward")

//                             doc.docs.forEach(async (myReport) => {

//                                 // await invoice.lottery.map(async (lot) => {


//                                 //     console.log("have data", myReport.data())

//                                 //     if (lot.win === true) {

//                                 //         console.log("ฉํนถูกรางวัล", lot.number)



//                                 //         await myReport.lottery.map(async (my_win) => {

//                                 //             console.log(my_win.number + " === " + lot.number)

//                                 //             if (my_win.number === lot.number) {
//                                 //                 //ถูกเลขนี้แล้ว ให้ update ยอดเงิน

//                                 //                 const total = myReport.data().win_total + lot.rewards;
//                                 //                 const chage = (total / 100) * 1.5;
//                                 //                 const amount = total - chage;

//                                 //                 // await firestore.collection("rewards").doc(myReport.id).update({
//                                 //                 //     lottery: invoice.lottery,
//                                 //                 //     win_total: total,
//                                 //                 //     win_chart: chage,
//                                 //                 //     win_amount: amount,
//                                 //                 //     uid: uid,
//                                 //                 //     success: false,
//                                 //                 //     create_date: new Date,
//                                 //                 //     update_date: new Date
//                                 //                 // })

//                                 //                 console.log(total, chage, amount)
//                                 //             }
//                                 //             else {
//                                 //                 const total = myReport.data().win_total + lot.rewards;
//                                 //                 const chage = (total / 100) * 1.5;
//                                 //                 const amount = total - chage;

//                                 //                 console.log(total, chage, amount)



//                                 //                 // await firestore.collection("rewards").doc(myReport.id).update({
//                                 //                 //     lottery: invoice.lottery,
//                                 //                 //     win_total: total,
//                                 //                 //     win_chart: chage,
//                                 //                 //     win_amount: amount,
//                                 //                 //     uid: uid,
//                                 //                 //     success: false,
//                                 //                 //     create_date: new Date,
//                                 //                 //     update_date: new Date
//                                 //                 // })
//                                 //             }

//                                 //         })

//                                 //     }


//                                 // })

//                             })



//                         }
//                         else {

//                             console.log("not have in record");

//                             console.log(lot.prize)

//                             const total = lot.rewards;
//                             const chage = (total / 100) * 1.5;
//                             const amount = total - chage;

//                             await firestore.collection("rewards").doc().set({
//                                 lottery: lot,
//                                 ngud:ngud,
//                                 win_total: total,
//                                 win_chart: chage,
//                                 win_amount: amount,
//                                 uid: uid,
//                                 success: false,
//                                 create_date: new Date,
//                                 update_date: new Date
//                             })
//                         }

//                     })
//                 }
//             })



//         })


//     } catch (error) {
//         console.log(error)
//     }


// }



// const createReportReward = async (_lottery, uid) => {

//     let rewards_DB = await firestore.collection('rewards').where("uid", "==", uid);

//     let report = {}

//     try {
//         await rewards_DB.get().then((docs) => docs.forEach(doc => {
//             if (doc) {
//                 report = {
//                     id: doc.id,
//                     lottery: doc.data().lottery,
//                     uid: doc.data().uid,
//                     win_total: doc.data().win_total,
//                     win_chart: doc.data().win_chart,
//                     win_amount: doc.data().win_amount,
//                 };
//                 console.log("get reward report ", report);
//             }
//             else {
//                 console.log("no reward report in collection", report)
//             }
//         }));
//     } catch (error) {
//         console.log(error)
//     }



//     if (Object.keys(report).length !== 0) {

//         console.log("created  ");

//         console.log("lot ", _lottery);
//         const _total = report.win_total + _lottery.rewards;
//         const _chage = (_lottery.rewards / 100) * 1.5;
//         const _amount = _total - _chage;

//         console.log(report);

//         report = {
//             ...report,
//             lottery: report.lottery.map((item) => {

//                 //ถูกเลขนี้อยู่แล้ว ให้บวกเพิ่มรางวัล แล้วเอารูปใส่ใน arr

//                 console.log("report ", item.number);
//                 console.log("this", _lottery.number)

//                 return item.number === _lottery.number ?
//                     {
//                         ...item,
//                         qty: item.qty + 1,
//                         lottery: [...item.lottery, ..._lottery.lottery]
//                     }
//                     :
//                     //ยังไม่ถูกเลขนี้อยู่แล้ว เอารูปใส่ใน arr
//                     item

//             })
//         }

//         report = {
//             ...report,
//             lottery: [...report.lottery, _lottery]
//         };

//         return await firestore.collection("rewards").doc(report.id).update({
//             lottery: report.lottery,
//             win_total: _total,
//             win_chart: _chage,
//             win_amout: _amount,
//             update_date: new Date
//         });
//     }
//     else {

//         console.log("not create  ", report);

//         const total = _lottery.rewards;
//         const chage = (_lottery.rewards / 100) * 1.5;
//         const amount = total - chage;

//         const lot_data = [];
//         lot_data.push(_lottery);

//         return await firestore.collection("rewards").doc().set({
//             lottery: lot_data,
//             win_total: total,
//             win_chart: chage,
//             win_amount: amount,
//             uid: uid,
//             success: false,
//             create_date: new Date,
//             update_date: new Date
//         });
//     }
// }


module.exports = {
    getNgud,
    check_prize,
    createNgud
}