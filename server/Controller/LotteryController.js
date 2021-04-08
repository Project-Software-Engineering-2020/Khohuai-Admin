const { firestore, bucket, storage } = require('../firebaseDB');
const multer = require("multer");

const upload = multer({
    // storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

const getAllLottery = async (req, res, next) => {
    let lotteryArray = []

    console.log("get Data")
    try {
        const lottery = await firestore.collection('LotteriesAvailable').get()
        if (lottery.empty) {
            res.status(400).send("No lottery in record")
        } else {
            lottery.docs.forEach(doc => {
                lotteryArray.push({
                    id: doc.id,
                    photoURL: doc.data().photoURL,
                    stock: doc.data().stock,
                    nguad: doc.data().nguad,
                    s_ref: doc.data().s_ref,
                    st: doc.data().st
                });
            });
            res.status(200).send(lotteryArray);
            console.log(lotteryArray)
        }
    } catch (error) {
        console.log(error);
    }
}

const UploadLottery = (req, res) => {
    console.log(req.body, req.file);

    if (!req.file) {
        res.status(400).send("Error: No files found")
    } else {
        const blob = bucket.file(req.file.originalname)

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })

        blobWriter.on('error', (err) => {
            console.log(err)
        })

        blobWriter.on('finish', () => {
            res.status(200).send("File uploaded.")
        })

        blobWriter.end(req.file.buffer)
    }


    // const url = bucket.file('/lotterys/0.jpg');
    // url.download().then(r => { res.status(200).send()})
    // if (file) {
    //     uploadImageToStorage(file).then((success) => {
    //         res.status(200).send({
    //             status: 'success'
    //         });
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }

}

const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${file.originalname}_${Date.now()}`;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
            resolve(url);
            console.log("Upload to cloud success");
        });

        blobStream.end(file.buffer);
    });
}

const insertLottery = async (req, res) => {
    const data = req.body.data;
    let new_lottery;

    try {
        await firestore.collection("LotteriesAvailable").doc(data.number).get()
            .then((doc) => {
                new_lottery = doc.data().id;
            });

        if (!new_lottery) {
            await firestore.collection("LotteriesAvailable").doc(data.number).set(new_lottery);
        }
        else {
            data.image.map((item) => {
                firestore.collection("LotteriesAvailable").doc(data.number)
                    .update({
                        "image":
                            FieldValue.arrayUnion(item)
                    })
            })
            res.send("success");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllLottery,
    UploadLottery,
    insertLottery,
    upload
}