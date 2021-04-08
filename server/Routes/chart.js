const express = require('express');
const { getSellperNgud } = require('../Controller/Chart')

const router = express.Router();

router.get('/',getSellperNgud);


module.exports = router;