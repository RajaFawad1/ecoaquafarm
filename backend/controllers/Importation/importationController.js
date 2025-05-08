// controllers/ImportationsController.js
const { Importation } = require("../../models");

exports.createImportation = async (req, res) => {
    console.log("Entrando a createImportation", req.body);
    try {
        const { date, invoices, transportExpenses, taxExpenses, summary } = req.body;

        const importation = await Importation.create({
            date,
            invoices,
            transportExpenses,
            taxExpenses,
            summary
        });

        res.status(201).json({
            message: "Importación creada correctamente",
            id: importation.id,
            importation
        });
    } catch (error) {
        console.error("Error al crear importación:", error);
        res.status(500).json({
            message: "Error al crear la importación",
            error: error.message
        });
    }
};


// Listar todas las importaciones
exports.listImportations = async (req, res) => {
    try {
        const importations = await Importation.findAll();
        res.status(200).json(importations);
    } catch (error) {
        console.error("Error al listar importaciones:", error);
        res.status(500).json({
            message: "Error al listar importaciones",
            error: error.message
        });
    }
};

// Obtener una importación por ID
exports.getImportationById = async (req, res) => {
    try {
        const { id } = req.params;
        const importation = await Importation.findByPk(id);
        if (!importation) {
            return res.status(404).json({ message: "Importación no encontrada" });
        }
        res.status(200).json(importation);
    } catch (error) {
        console.error("Error al obtener importación:", error);
        res.status(500).json({
            message: "Error al obtener la importación",
            error: error.message
        });
    }
};
