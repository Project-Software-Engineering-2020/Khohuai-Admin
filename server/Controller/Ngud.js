const { firestore } = require('../firebaseDB');
const Axios = require('axios')

const getNgud = async (req, res, next) => {
    let data = [];
    try {
        const ngud = await firestore.collection('ngud').orderBy("end", "desc").get()
        await ngud.docs.forEach(doc => {
            data.push({
                ngud: doc.id,
                end: doc.data().end.toDate(),
                start: doc.data().start.toDate(),
            })
        });
        res.send(data);

    } catch (error) {
        console.log(error);
    }

}

const check_prize = async (req, res) => {

    console.log("ตรวจรางวัล")

    let Prizes = [];
    let RunningNumbers = [];
    let invoices = [];
    // let your_lottery = [];
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
        })
    });

    await invoices.map((invoice, i) => {

        console.log(invoice.lottery);
        lottery_invoice = [];
        // setInputList(initialInputList);
        invoice.lottery.map((your_lottery, index) => {

            win = [];
            reward = 0;


            // setInputList(list);
            // รางวัลที่ 1 ถึง 5
            Prizes.map((prize) => {
                prize.number.map((number) => {

                    if (number === your_lottery.number) {
                        // const list = [...inputList];
                        // your_lottery[index]["prize"] = prize.name;
                        // setInputList(list);
                        win.push(prize.name);
                        reward += parseInt(prize.reward);
                        console.log("คุณถูกรางวัลที่ " + your_lottery);
                    }
                    // else {
                    //     console.log(number +"  !==  " +item.number)
                    //     console.log("คุณไม่ถูกรางวัลที่ 1 2 3 4 5 ")
                    // }
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
                        // const list = [...inputList];
                        // list[index]["result"].push("ถูก" + run.name);
                        // setInputList(list);
                        win.push(run.name)
                        reward += parseInt(run.reward);
                    }
                    //รางวัลเลขท้าย 3 ตัว
                    if (numberInt === my3LastLot && run.name === "รางวัลเลขท้าย 3 ตัว") {
                        // const list = [...inputList];
                        // list[index]["result"].push("ถูก" + run.name);
                        // setInputList(list);
                        win.push(run.name)
                        reward += parseInt(run.reward);
                    }
                    //รางวัลเลขท้าย 2 ตัว
                    console.log(numberInt + " === " + my2LastLot)
                    if (numberInt === my2LastLot && run.name === "รางวัลเลขท้าย 2 ตัว") {
                        // const list = [...inputList];
                        // list[index]["result"].push("ถูก" + run.name);
                        // setInputList(list);
                        win.push(run.name)
                        reward += parseInt(run.reward);
                    }
                    return [];
                })
                return [];

            })
            if (win.length === 0) {
                // console.log("ไม่ถูกรางวัล", your_lottery);
                // const list = [...inputList];
                // list[index]["result"].push("ไม่ถูกรางวัล");
                // setInputList(list);
                lottery_invoice.push(
                    {
                        number: your_lottery.number,
                        status: true,
                        prize: ['ไม่ถูกรางวัล'],
                        rewards: reward,
                        qty: your_lottery.qty,
                        lottery: your_lottery.lottery
                    }
                )
            }
            else {
                // console.log("คุณถูกรางวัล",win);
                lottery_invoice.push(
                    {
                        number: your_lottery.number,
                        status: true,
                        prize: win,
                        rewards: reward,
                        qty: your_lottery.qty,
                        lottery: your_lottery.lottery
                    }
                )
            }

            // invoice.lottery[index]["status"] = true;
        })
        firestore.collection("invoices").doc(invoice.id).update({
            lottery: lottery_invoice
        })
    })

    res.status(200).send("success");
}

module.exports = {
    getNgud,
    check_prize
}