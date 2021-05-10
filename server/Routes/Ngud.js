const express = require('express');
const { getNgud, check_prize, createNgud } = require('../Controller/Ngud')

const router = express.Router();

router.post('/',createNgud)
router.get('/check_prize/:id',check_prize);
router.get('/',getNgud);


module.exports = router;