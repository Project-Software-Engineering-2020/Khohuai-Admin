const express = require('express');
const { getAllUser } = require('../Controller/UserController')

const router = express.Router();

router.get('/',getAllUser);

module.exports = router;