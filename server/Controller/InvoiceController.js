const { firestore } = require('../firebaseDB');

const getAllInvoice = async (req, res, next) => {

    let ngud_id = req.params.id;


    let invoiceArray = []

    try {
        if (ngud_id === "lastest") {
            let ngudDB = await firestore.collection('ngud').orderBy("end", "desc").get();

            await ngudDB.docs.forEach((doc, index) => {
              
                if (index == 0) {
                    ngud_id = doc.id;
                }
            });

            let invoice = await firestore.collection('invoices')
                .where("ngud", "==", ngud_id)
                .get()
            // 
            if (invoice.empty) {
                res.status(400).send("No lottery in record")
            } else {
                invoice.docs.forEach(doc => {
                    invoiceArray.push({
                        date: doc.data().date.toDate(),
                        ngud: doc.data().ngud,
                        totalprice: doc.data().totalprice,
                        invoiceid: doc.id,
                        quantity: doc.data().quantity,
                        lottery: doc.data().lottery,
                        userid: doc.data().userid,
                        firstname: doc.data().firstname,
                        lastname: doc.data().lastname,
                        result: doc.data().result
                    });
                });
                res.send(invoiceArray)
            }

        }
        else {
            let invoice = await firestore.collection('invoices')
                // .where("userid", "!=", "khohuai")
                .where("ngud", "==", ngud_id)
                .get()
            // 
            if (invoice.empty) {
                res.status(400).send("No lottery in record")
            } else {
                invoice.docs.forEach(doc => {
                    invoiceArray.push({
                        date: doc.data().date.toDate(),
                        ngud: doc.data().ngud,
                        totalprice: doc.data().totalprice,
                        invoiceid: doc.id,
                        quantity: doc.data().quantity,
                        lottery: doc.data().lottery,
                        userid: doc.data().userid,
                        firstname: doc.data().firstname,
                        lastname: doc.data().lastname,
                        result: doc.data().result
                    });
                });
                res.send(invoiceArray)
            }
        }


    } catch (error) {
        console.log(error);
    }
}

const getSummary = async (req, res) => {
   
    let start = new Date('2021-03-01');
    let end = new Date('2021-03-31');
    let invoiceArray = []
    try {

        const invoice = await firestore.collection('invoices')
            .where("date", ">=", start).where("date", "<=", end).get()

        await invoice.docs.forEach(doc => {
            invoiceArray.push({
                date: doc.data().date.toDate(),
                nguad: doc.data().ngud,
                totalprice: doc.data().totalprice,
                invoiceid: doc.id,
                quantity: doc.data().quantity,
                lottery: doc.data().lottery,
                userid: doc.data().userid,
                result: doc.data().result
            });
        });

        res.status(200).send(invoiceArray);
       

    } catch (error) {

    }

}

const getInvoice = async (req, res) => {

    const id = req.params.id;

    let invoiceArray = []

    let ngud_number;
    let _date;
    let _nguad;
    let _totalprice;
    let _invoiceid;
    let _quantity;
    let _lottery;
    let _userid;
    let ngud_dateee;
    let _status_check = false;

    let data = [];

    try {

        // const ngud = await firestore.collection('ngud').orderBy("end", "desc").get()
        // await ngud.docs.forEach(async(doc) => {
        //     await data.push({
        //         ngud: doc.id,
        //         end: doc.data().end,
        //         start: doc.data().start,
        //         total_lottery: doc.data().total_lottery,
        //         total_onhand: doc.data().total_onhand,
        //         open: doc.data().open
        //     })
        // });

        const invoice = await firestore.collection('invoices').doc(id);

        await invoice.get().then((doc) => {

            invoiceArray.push({
                date: doc.data().date.toDate(),
                ngud: doc.data().ngud,
                totalprice: doc.data().totalprice,
                invoiceid: doc.id,
                quantity: doc.data().quantity,
                lottery: doc.data().lottery,
                userid: doc.data().userid,
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                result: doc.data().result
            });

            // ngud_number = doc.data().ngud;
            // _date = doc.data().date.toDate();
            // _ngud = doc.data().ngud;
            // _totalprice = doc.data().totalprice;
            // _invoiceid = doc.id;
            // _quantity = doc.data().quantity;
            // _lottery = doc.data().lottery;
            // _userid = doc.data().userid;

            // invoiceArray.push({
            //     invoiceid: _invoiceid,
            //     date: _date,
            //     ngud: _ngud,
            //     ngud_date: d.data().end,
            //     totalprice: _totalprice,
            //     quantity: _quantity,
            //     lottery: _lottery,
            //     userid: _userid,
            //     status_check: _status_check
            // });
        });
        // await firestore.collection('ngud').doc("01").get()
        //     .then((d) => {
        //         ngud_dateee = d.data().end

        //         invoiceArray.push({
        //             invoiceid: _invoiceid,
        //             date: _date,
        //             ngud: _ngud,
        //             ngud_date: d.data().end,
        //             totalprice: _totalprice,
        //             quantity: _quantity,
        //             lottery: _lottery,
        //             userid: _userid,
        //             status_check: _status_check
        //         });

        //     });


        await res.status(200).send(invoiceArray);
    } catch (error) {
        console.log(error);
    }
}

const getInvoiceOfUser = async (req, res) => {

    const userid = req.params.userid;
    let invoice_customer;
    let invoiceArray = []
    let data_result = []
    try {

        const userdata = await firestore.collection('users').doc(userid)
        await userdata.get().then((doc) => {
            invoice_customer = doc.data();
        })


        const invoice = await firestore.collection('invoices')
            .where("userid", "==", userid)
            .orderBy("date", "desc")
            .get()

        await invoice.docs.forEach(doc => {

            invoiceArray.push({
                id: doc.id,
                date: doc.data().date.toDate(),
                ngud: doc.data().ngud,
                totalprice: doc.data().totalprice,
                invoiceid: doc.data().invoiceid,
                quantity: doc.data().quantity,
                lottery: doc.data().lottery,
                userid: doc.data().userid,
                result: doc.data().result,
                win: doc.data().win
            });
        });

        await data_result.push({
            firstname: invoice_customer.firstname,
            lastname: invoice_customer.lastname,
            all_invoice: invoiceArray,
        })

        res.status(200).send(data_result);

    } catch (error) {

    }

}

module.exports = {
    getAllInvoice,
    getSummary,
    getInvoice,
    getInvoiceOfUser,
}