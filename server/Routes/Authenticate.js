const express = require('express');
const {signin} = require('../Controller/Authentication');

const router = express.Router();

router.post('/login',signin);

module.exports = router;