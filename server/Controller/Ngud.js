const { firestore } = require('../firebaseDB');

const getNgud = async (req, res, next) => {
    let data = [];
    try {
        const ngud = await firestore.collection('ngud').orderBy("end", "desc").get()
        await ngud.docs.forEach(doc => {
            data.push({
                ngud:doc.id,
                start:doc.data().start.toDate(),
                end:doc.data().end.toDate()
            })
        });
        res.send(data);

    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    getNgud
}