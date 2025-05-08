

const { FileSKU } = require("../../models");

const ProductFileController = {
    async upload(req, res) {
        try {
            const { sku, nombre, type } = req.body;
            if (!req.file) {
                return res.status(400).json({ message: "No se subió ningún archivo" });
            }

            // Construir la ruta relativa del archivo subido
            const fileUrl = `/public/uploads/${sku}/${req.file.filename}`;
            // Guardamos el registro en la base de datos
            const fileRecord = await FileSKU.create({
                sku,
                nombre,
                type,
                url: fileUrl,
            });

            return res.status(201).json({
                message: "Archivo subido exitosamente",
                file: fileRecord,
            });
        } catch (error) {
            console.error("Error en ProductFileController.upload:", error);
            return res.status(500).json({
                message: "Error al subir el archivo",
                error: error.message,
            });
        }
    },
};

module.exports = ProductFileController;
