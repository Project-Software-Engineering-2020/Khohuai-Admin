const express = require('express');
const { getAllUserWin,getDetailUserReward,uploadSlip } = require('../Controller/Reward')

const router = express.Router();

router.get('/:id',getAllUserWin);
router.get('/detail/:id',getDetailUserReward );
router.put('/uploadslip', uploadSlip)

module.exports = router;