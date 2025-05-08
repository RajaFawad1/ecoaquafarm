// controllers/FilesController.js
const fs = require("fs");
const path = require("path");
const FileRecord = require("../models/FileRecord");

// Subir un archivo
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se ha subido ningún archivo" });
        }
        // Extraer campos adicionales enviados desde el frontend:
        // Puedes enviar "fileName" (opcional) y "category"
        const { category, fileName } = req.body;
        // Si se envía fileName, se usa; de lo contrario, se utiliza el nombre asignado por multer
        const name = fileName || req.file.filename;
        // Se asume que la carpeta "files" se sirve como estática en "/files"
        const url = `/files/${req.file.filename}`;

        // Crear registro en la base de datos
        const record = await FileRecord.create({
            name,
            category,
            url,
        });

        res.status(200).json({ message: "Archivo subido correctamente", file: req.file, record });
    } catch (error) {
        console.error("Error al subir archivo:", error);
        res.status(500).json({ message: "Error al subir el archivo", error: error.message });
    }
};

// Listar archivos consultando el modelo
exports.listFiles = async (req, res) => {
    try {
        const records = await FileRecord.findAll();
        res.status(200).json(records);
    } catch (error) {
        console.error("Error al listar archivos:", error);
        res.status(500).json({ message: "Error al listar archivos", error: error.message });
    }
};

// Descargar un archivo dado su nombre (consulta el sistema de archivos)
exports.downloadFile = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), "public", "files", filename);
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error("Error al descargar archivo:", err);
            return res.status(500).json({ message: "Error al descargar el archivo", error: err.message });
        }
    });
};
