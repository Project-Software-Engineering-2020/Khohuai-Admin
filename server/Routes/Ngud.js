const express = require('express');
const { getNgud, check_prize } = require('../Controller/Ngud')

const router = express.Router();


router.get('/check_prize',check_prize);
router.get('/',getNgud);


module.exports = router;