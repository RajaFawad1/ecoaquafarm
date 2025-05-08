const express = require("express");
const router = express.Router();
const {
    getDistributors,
    createDistributor,
    updateDistributor,
    deleteDistributor
} = require("../controllers/Distributor/distributorController");

// Rutas CRUD para distribuidores
router.get("/", getDistributors);
router.post("/", createDistributor);
router.put("/:id", updateDistributor);
router.delete("/:id", deleteDistributor);

module.exports = router;
