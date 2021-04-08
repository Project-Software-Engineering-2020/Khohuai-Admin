const express = require('express');
const multer = require('multer');
const { getAllLottery,UploadLottery,upload,insertLottery } = require('../Controller/LotteryController')

const router = express.Router();

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//     }
// });

router.get('/',getAllLottery);
// router.post('/',upload.single('image'),UploadLottery);
router.post('/',insertLottery);

module.exports = router;