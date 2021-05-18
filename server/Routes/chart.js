const express = require('express');
const { getSellperNgud,getIncome } = require('../Controller/Chart')

const router = express.Router();

router.get('/',getSellperNgud);
router.get('/income',getIncome)


module.exports = router;