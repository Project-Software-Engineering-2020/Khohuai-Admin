const express = require('express');
const { getAllInvoice,getSummary,getInvoice,getInvoiceOfUser } = require('../Controller/InvoiceController')

const router = express.Router();

router.get('/:id',getAllInvoice);
router.get('/detail/:id',getInvoice);
router.get('/user/:userid',getInvoiceOfUser);
router.get('/chart',getSummary);

module.exports = router;