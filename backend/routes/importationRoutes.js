// routes/importations.js
const express = require("express");
const router = express.Router();
const importationsController = require("../controllers/Importation/importationController");

// Ruta para crear una nueva importación
router.post("/", importationsController.createImportation);

// Ruta para listar todas las importaciones
router.get("/", importationsController.listImportations);

// Ruta para obtener una importación por ID
router.get("/:id", importationsController.getImportationById);

module.exports = router;
