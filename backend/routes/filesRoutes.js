const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const filesController = require("../controllers/FilesController");

// Ruta para subir un archivo (campo "file" en el formulario)
router.post("/", upload.single("file"), filesController.uploadFile);

// Ruta para listar archivos
router.get("/list", filesController.listFiles);

// Ruta para descargar un archivo (se pasa el nombre del archivo como parámetro)
router.get("/download/:filename", filesController.downloadFile);

module.exports = router;
