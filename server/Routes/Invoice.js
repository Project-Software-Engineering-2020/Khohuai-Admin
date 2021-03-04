const express = require('express');
const { getAllInvoice } = require('../Controller/InvoiceController')

const router = express.Router();

router.get('/',getAllInvoice);

module.exports = router;