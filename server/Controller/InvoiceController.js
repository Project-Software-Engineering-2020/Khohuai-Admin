const { firestore } = require('../firebaseDB');

const getAllInvoice = async (req, res, next) => {
    let invoiceArray = []

    try {
        const invoice = await firestore.collection('invoices').orderBy("date", "desc").get()
        if (invoice.empty) {
            res.status(400).send("No lottery in record")
        } else {
            invoice.docs.forEach(doc => {
                invoiceArray.push({
                    date: doc.data().date.toDate(),
                    nguad: doc.data().nguad,
                    totalprice: doc.data().totalprice,
                    invoiceid: doc.data().invoiceid,
                    quantity: doc.data().quantity,
                    lottery: doc.data().lottery,
                    userid: doc.data().userid
                });
            });
            res.status(200).send(invoiceArray);
            console.log(invoiceArray)
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllInvoice
}