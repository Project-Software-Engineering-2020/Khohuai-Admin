const { firestore } = require('../firebaseDB');
const Axios = require('axios');

const getNgud = async (req, res, next) => {
    let data = [];
    try {
        const ngud = await firestore.collection('ngud').orderBy("end", "desc").get()
        await ngud.docs.forEach(doc => {
            data.push({
                ngud: doc.id,
                end: doc.data().end,
                start: doc.data().start,
            })
        });
        res.send(data);

    } catch (error) {
        console.log(error);
    }
}

const createNgud = (req,res) => {
    const data = req.body;


    console.log(data);

    try {
        firestore.collection("ngud").doc(data.ngud_id).set(data)
    } catch (err) {
        console.log(err);
    }
}

const check_prize = async (req, res) => {

    console.log("ตรวจรางวัล")

    let Prizes = [];
    let RunningNumbers = [];
    let invoices = [];
    let list = [];
    let win = [];
    let reward = 0;
    let lottery_invoice = [];

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

    let invoicesDB = firestore.collection('invoices').get();
    // invoicesDB = invoicesDB.where("win", "==", true)

    let invoices = [];
    let user_win = [];
    let dataWin = [];

    try {

        await invoicesDB.then(async (docs) => docs.forEach(async doc => {

            console.log("uid = == ", doc.data().userid);

            if (doc.data().win === true) {
                await invoices.push({
                    id: doc.id,
                    lottery: doc.data().lottery,
                    uid: doc.data().userid,
                    ngud_date: doc.data().check_date,
                    ngud: 01,
                    win: doc.data().win
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

            dataWin = [];

            await invoices.map(async (invoice) => {

                if (invoice.uid === userid) {

                    await invoice.lottery.map(async (item_win) => {

                        if (item_win.win === true) {

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

                total += d.reward * d.qty;
                chage = (total / 100) * 1.5;
                amount = total - chage;
            })

            let bill_recieve_reward = {
                lottery: dataWin,
                win_total: total,
                win_chart: chage,
                win_amount: amount,
                success: false,
                create_date: new Date,
                update_date: new Date,
                uid: userid
            }

            await firestore.collection("rewards").doc().set(bill_recieve_reward);

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