const express = require('express');
const { getAllLottery,insertLottery } = require('../Controller/LotteryController')

const router = express.Router();

router.get('/',getAllLottery);
router.post('/',insertLottery);

module.exports = router;