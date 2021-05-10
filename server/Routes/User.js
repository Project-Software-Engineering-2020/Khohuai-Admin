const express = require('express');
const { getAllUser,rewardOfUser } = require('../Controller/UserController')

const router = express.Router();

router.get('/',getAllUser);
router.get('/reward/:id',rewardOfUser);

module.exports = router;