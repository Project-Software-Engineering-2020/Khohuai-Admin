const express = require('express');
const { getAllLottery } = require('../Controller/LotteryController')

const router = express.Router();


router.get('/',getAllLottery);


module.exports = router;