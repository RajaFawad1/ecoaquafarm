const express = require("express");
const router = express.Router();
const {
    getStores,
    createStore,
    deleteStore, // Nueva función de eliminación
} = require("../controllers/storeController");

router.get("/", getStores); // Obtener todas las tiendas
router.post("/", createStore); // Crear una nueva tienda
router.delete("/:id", deleteStore);

module.exports = router;
