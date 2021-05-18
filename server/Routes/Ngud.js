const express = require('express');
const { getNgud, check_prize, createNgud,updateNgud } = require('../Controller/Ngud')

const router = express.Router();

router.post('/',createNgud);
router.put('/',updateNgud);
router.get('/check_prize/:id',check_prize);
router.get('/',getNgud);
// /


module.exports = router;