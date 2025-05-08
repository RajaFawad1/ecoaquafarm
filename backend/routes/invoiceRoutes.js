const express = require("express");
const router = express.Router();
const { getInvoices, createInvoice, getInvoiceById, getInvoicesCSV } = require("../controllers/invoiceController");

router.get("/", getInvoices); // Obtener facturas paginadas
router.post("/", createInvoice); // Crear una nueva factura
router.get("/:id", getInvoiceById); // Obtener una factura por su ID
router.get('/invoices/csv', getInvoicesCSV);

module.exports = router;
