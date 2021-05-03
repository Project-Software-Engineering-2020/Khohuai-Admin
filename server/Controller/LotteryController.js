const { firestore } = require('../firebaseDB');
// const multer = require("multer");

// const upload = multer({
//     // storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//     }
// });

const getCurrentNgud = async () => {

    let ngud = {}

    try {
        const ngudDB = await firestore.collection("ngud").get();

        ngudDB.docs.forEach((doc) => {
            ngud = {
                ...ngud,
                id: doc.id,
                open: false,

            }
        })

        return ngud;

    } catch (error) {
        console.log(error)
    }
}


const getAllLottery = async (req, res, next) => {
    let lotteryArray = []

    console.log("get Data")
    try {
        const ngud = await getCurrentNgud();
        console.log("ngud", ngud);

        // if (ngud.open === true) {

            const lottery = await firestore.collection('lottery').get()
            if (lottery.empty) {
                res.status(400).send("No lottery in record")
            } else {
                lottery.docs.forEach(doc => {
                    lotteryArray.push({
                        id: doc.id,
                        photoURL: doc.data().photoURL,
                        stock: doc.data().photoURL.length,
                    });
                });
                res.status(200).send(lotteryArray);
            }
        // }
        // else {
        //     console.log("คุณยังไม่ได้อยู่ในช่วงเวลาเปิดการขายสลาก")
        // }

    } catch (error) {
        console.log(error);
    }
}

// const UploadLottery = (req, res) => {
//     console.log(req.body, req.file);

//     if (!req.file) {
//         res.status(400).send("Error: No files found")
//     } else {
//         const blob = bucket.file(req.file.originalname)

//         const blobWriter = blob.createWriteStream({
//             metadata: {
//                 contentType: req.file.mimetype
//             }
//         })

//         blobWriter.on('error', (err) => {
//             console.log(err)
//         })

//         blobWriter.on('finish', () => {
//             res.status(200).send("File uploaded.")
//         })

//         blobWriter.end(req.file.buffer)
//     }


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

// }

// const uploadImageToStorage = (file) => {
//     return new Promise((resolve, reject) => {
//         if (!file) {
//             reject('No image file');
//         }
//         let newFileName = `${file.originalname}_${Date.now()}`;

//         let fileUpload = bucket.file(newFileName);

//         const blobStream = fileUpload.createWriteStream({
//             metadata: {
//                 contentType: file.mimetype
//             }
//         });

//         blobStream.on('error', (error) => {
//             reject('Something is wrong! Unable to upload at the moment.');
//         });

//         blobStream.on('finish', () => {
//             // The public URL can be used to directly access the file via HTTP.
//             const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
//             resolve(url);
//             console.log("Upload to cloud success");
//         });

//         blobStream.end(file.buffer);
//     });
// }

const insertLottery = async (req, res) => {

    const number = req.body.number;
    const image = req.body.image_boss;

    console.log(number);
    console.log(image);

    let new_lottery;
    let _photoURL = [];

    try {
        const ngud = await getCurrentNgud();

        const this_lottery = await firestore.collection("lottery").doc(number)

        this_lottery.get().then((doc) => {
            new_lottery = doc.id;
            _photoURL = doc.data().photoURL;
        });

        if (!new_lottery) {
            console.log(new_lottery);
            //insert ครั้งแรก
            await firestore.collection("lottery").doc(number)
                .set({
                    photoURL: image,
                    ngud: ngud
                });
            console.log("ครั้งแรก")
        }
        else {
            console.log("เพิ่มสต็อก");
            image.map((item) => {
                photoURL.push(item);
            })

            //เพิ่ม stock สลาก
            data.image.map((item) => {
                firestore.collection("lottery").doc(number)
                    .update({
                        "photoURL": photoURL
                    })
            })
            res.status(200).send("success");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllLottery,
    insertLottery,
}