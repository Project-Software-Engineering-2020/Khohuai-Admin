const express = require('express');
const { getNgud } = require('../Controller/Ngud')

const router = express.Router();

router.get('/',getNgud);


module.exports = router;