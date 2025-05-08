const { Invoice, Store, ReturnInvoice } = require("../models");

// Crear una nueva factura de devolución
const createReturnInvoice = async (req, res) => {
    const { originalInvoiceId, storeId, returnAmount, reason } = req.body;

    try {
        // Verificar que la factura original existe
        const originalInvoice = await Invoice.findById(originalInvoiceId);
        if (!originalInvoice) {
            return res.status(404).json({ message: 'Factura original no encontrada' });
        }

        // Verificar que la tienda existe
        const store = await Store.findById(storeId);
        if (!store) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }

        // Crear la factura de devolución
        const returnInvoice = new ReturnInvoice({
            originalInvoice: originalInvoiceId,
            store: storeId,
            returnAmount,
            reason,
        });

        await returnInvoice.save();
        res.status(201).json(returnInvoice);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la factura de devolución', error });
    }
};

// Obtener todas las facturas de devolución
const getReturnInvoices = async (req, res) => {
    try {
        const returnInvoices = await ReturnInvoice.find()
            .populate('originalInvoice') // Poblar los datos de la factura original
            .populate('store'); // Poblar los datos de la tienda

        res.status(200).json(returnInvoices);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las facturas de devolución', error });
    }
};

module.exports = {
    createReturnInvoice,
    getReturnInvoices,
};
