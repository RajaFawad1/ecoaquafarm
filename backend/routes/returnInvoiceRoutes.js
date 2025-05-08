const express = require('express');
const router = express.Router();
const { createReturnInvoice, getReturnInvoices } = require('../controllers/returnInvoiceController');

// Ruta para obtener todas las facturas de devolución
router.get('/', getReturnInvoices);

// Ruta para crear una nueva factura de devolución
router.post('/', createReturnInvoice);

module.exports = router;
