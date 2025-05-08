const { Invoice, Client, Store, Product } = require("../models");
const { Parser } = require('json2csv');

exports.getInvoicesCSV = async (req, res) => {
    const { month, year, storeId } = req.query;

    try {
        // Filtrar facturas
        const where = {};
        if (month) where.month = month;
        if (year) where.year = year;
        if (storeId) where.storeId = storeId;

        const invoices = await Invoice.findAll({
            where,
            include: [
                { model: Store, as: 'store' },
                { model: Client, as: 'client' },
            ],
        });

        // Convertir a CSV
        const fields = ['numberInvoice', 'total', 'date', 'store.name', 'client.nombre'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(invoices);

        // Respuesta
        res.header('Content-Type', 'text/csv');
        res.attachment('invoices.csv');
        res.status(200).send(csv);
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).json({ error: 'Error generating CSV' });
    }
};


// Obtener todas las facturas con paginación
exports.getInvoices = async (req, res) => {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const invoices = await Invoice.findAndCountAll({
            include: [
                {
                    model: Product,
                    as: "products", // Alias definido en la relación
                },
                {
                    model: Client,
                    as: "client", // Alias definido en la relación
                },
                {
                    model: Store,
                    as: "store", // Alias definido en la relación
                },
            ],
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
        });

        res.status(200).json({
            data: invoices.rows,
            total: invoices.count,
            page: parseInt(page, 10),
            totalPages: Math.ceil(invoices.count / limit),
        });
    } catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva factura
exports.createInvoice = async (req, res) => {
    const { products, clientData, ...invoiceData } = req.body;

    try {
        // Verificar o crear cliente
        let clientId = clientData?.id || null;
        if (!clientId) {
            let defaultClient = await Client.findOne({ where: { dniCif: "VARIOUS_CLIENTS" } });
            if (!defaultClient) {
                defaultClient = await Client.create({
                    nombre: "Clientes Varios",
                    apellidos: "",
                    telefono: "",
                    direccion: "",
                    codigoPostal: "",
                    provincia: "",
                    pais: "",
                    tipoCliente: "particular",
                    dniCif: "VARIOUS_CLIENTS",
                    email: "",
                    mensaje: "",
                });
            }
            clientId = defaultClient.id;
        }

        // Obtener el último número de factura
        const lastInvoice = await Invoice.findOne({
            where: { storeId: invoiceData.storeId },
            order: [["numberInvoice", "DESC"]],
        });
        const nextInvoiceNumber = lastInvoice ? lastInvoice.numberInvoice + 1 : 1;

        // Crear la factura
        const invoice = await Invoice.create({
            ...invoiceData,
            clientId,
            numberInvoice: nextInvoiceNumber,
        });

        // Asociar productos a la factura, asegurando que los precios tengan el IVA incluido
        if (products && Array.isArray(products)) {
            const productsWithTaxIncluded = products.map((product) => ({
                ...product,
                price: parseFloat(product.price * (1 + product.iva / 100)), // Asegurar IVA incluido
                invoiceId: invoice.id,
            }));
            await Product.bulkCreate(productsWithTaxIncluded);
        }

        // Obtener la factura creada con relaciones
        const createdInvoice = await Invoice.findByPk(invoice.id, {
            include: [
                { model: Product, as: "products" },
                { model: Client, as: "client" },
                { model: Store, as: "store" },
            ],
        });

        res.status(201).json(createdInvoice);
    } catch (error) {
        console.error("Error creando factura:", error);
        res.status(500).json({ error: error.message });
    }
};


// Obtener una factura específica por ID
exports.getInvoiceById = async (req, res) => {
    const { id } = req.params;

    try {
        const invoice = await Invoice.findByPk(id, {
            include: [
                {
                    model: Product,
                    as: "products",
                },
                {
                    model: Client,
                    as: "client",
                },
                {
                    model: Store,
                    as: "store",
                },
            ],
        });

        if (!invoice) {
            return res.status(404).json({ error: "Factura no encontrada" });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error("Error fetching invoice by ID:", error);
        res.status(500).json({ error: "Error al obtener la factura" });
    }
};
