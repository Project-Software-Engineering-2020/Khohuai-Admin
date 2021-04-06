const express = require('express');
const { getAllInvoice,getSummary,getInvoice,getInvoiceOfUser } = require('../Controller/InvoiceController')

const router = express.Router();

router.get('/',getAllInvoice);
router.get('/:id',getInvoice);
router.get('/user/:userid',getInvoiceOfUser);
router.get('/chart',getSummary);

module.exports = router;