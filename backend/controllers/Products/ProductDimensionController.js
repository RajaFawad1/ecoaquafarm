// controllers/Products/ProductDimensionController.js
const { PackageDimension } = require("../../models");

const ProductDimensionController = {
    // Crear nuevas dimensiones para un producto
    async crear(req, res) {
        try {
            const { ASIN, longitudProducto, anchoProducto, alturaProducto, pesoNeto } = req.body;
            const dimension = await ProductDimension.create({
                ASIN,
                longitudProducto,
                anchoProducto,
                alturaProducto,
                pesoNeto,
            });
            return res.status(201).json({
                message: "Dimensión del producto creada exitosamente",
                dimension,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al crear la dimensión del producto", error: error.message });
        }
    },

    // Obtener las dimensiones de un producto por ASIN
    async obtener(req, res) {
        try {
            const { ASIN } = req.params;
            const dimension = await ProductDimension.findOne({ where: { ASIN } });
            if (!dimension) {
                return res.status(404).json({ message: "Dimensión del producto no encontrada" });
            }
            return res.status(200).json(dimension);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener la dimensión del producto", error: error.message });
        }
    },

    // Actualizar las dimensiones de un producto
    async actualizar(req, res) {
        try {
            const { ASIN } = req.params;
            const dimension = await ProductDimension.findOne({ where: { ASIN } });
            if (!dimension) {
                return res.status(404).json({ message: "Dimensión del producto no encontrada" });
            }
            await dimension.update(req.body);
            return res.status(200).json({
                message: "Dimensión del producto actualizada exitosamente",
                dimension,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al actualizar la dimensión del producto", error: error.message });
        }
    },

    // Eliminar las dimensiones de un producto
    async eliminar(req, res) {
        try {
            const { ASIN } = req.params;
            const dimension = await ProductDimension.findOne({ where: { ASIN } });
            if (!dimension) {
                return res.status(404).json({ message: "Dimensión del producto no encontrada" });
            }
            await dimension.destroy();
            return res.status(200).json({ message: "Dimensión del producto eliminada exitosamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al eliminar la dimensión del producto", error: error.message });
        }
    },
};

module.exports = ProductDimensionController;
