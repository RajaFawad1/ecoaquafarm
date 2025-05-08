// controllers/Products/PackageDimensionController.js
const { PackageDimension } = require("../../models");

const PackageDimensionController = {
    // Crear nuevas dimensiones para el paquete
    async crear(req, res) {
        try {
            const {
                ASIN,
                longitudPaquete,
                anchoPaquete,
                alturaPaquete,
                pesoBruto,
                tipoEmbalaje,
                cantidadPiezas,
                unidadMedida,
            } = req.body;
            const dimension = await PackageDimension.create({
                ASIN,
                longitudPaquete,
                anchoPaquete,
                alturaPaquete,
                pesoBruto,
                tipoEmbalaje,
                cantidadPiezas,
                unidadMedida,
            });
            return res.status(201).json({
                message: "Dimensión del paquete creada exitosamente",
                dimension,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al crear la dimensión del paquete", error: error.message });
        }
    },

    // Obtener las dimensiones del paquete por ASIN
    async obtener(req, res) {
        try {
            const { ASIN } = req.params;
            const dimension = await PackageDimension.findOne({ where: { ASIN } });
            if (!dimension) {
                return res.status(404).json({ message: "Dimensión del paquete no encontrada" });
            }
            return res.status(200).json(dimension);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener la dimensión del paquete", error: error.message });
        }
    },

    // Actualizar las dimensiones del paquete
    async actualizar(req, res) {
        try {
            const { ASIN } = req.params;
            const dimension = await PackageDimension.findOne({ where: { ASIN } });
            if (!dimension) {
                return res.status(404).json({ message: "Dimensión del paquete no encontrada" });
            }
            await dimension.update(req.body);
            return res.status(200).json({
                message: "Dimensión del paquete actualizada exitosamente",
                dimension,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al actualizar la dimensión del paquete", error: error.message });
        }
    },

    // Eliminar las dimensiones del paquete
    async eliminar(req, res) {
        try {
            const { ASIN } = req.params;
            const dimension = await PackageDimension.findOne({ where: { ASIN } });
            if (!dimension) {
                return res.status(404).json({ message: "Dimensión del paquete no encontrada" });
            }
            await dimension.destroy();
            return res.status(200).json({ message: "Dimensión del paquete eliminada exitosamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al eliminar la dimensión del paquete", error: error.message });
        }
    },
};

module.exports = PackageDimensionController;
