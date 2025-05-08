const { Distributor } = require("../../models");

exports.getDistributors = async (req, res) => {
    try {
        const distributors = await Distributor.findAll();
        res.json(distributors);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los distribuidores." });
    }
};

exports.createDistributor = async (req, res) => {
    console.log("entrando a createDistributor", req.body);
    try {
        const distributor = await Distributor.create(req.body);
        res.status(201).json(distributor);
    } catch (error) {
        console.error("Error al crear el distribuidor:", error);
        res.status(500).json({
            error: "Error al crear el distribuidor.",
            details: error.message
        });
    }
};


exports.updateDistributor = async (req, res) => {
    try {
        const { id } = req.params;
        const distributor = await Distributor.findByPk(id);
        if (!distributor) return res.status(404).json({ error: "Distribuidor no encontrado." });

        await distributor.update(req.body);
        res.status(200).json(distributor);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el distribuidor." });
    }
};

exports.deleteDistributor = async (req, res) => {
    try {
        const { id } = req.params;
        const distributor = await Distributor.findByPk(id);
        if (!distributor) return res.status(404).json({ error: "Distribuidor no encontrado." });

        await distributor.destroy();
        res.status(200).json({ message: "Distribuidor eliminado con éxito." });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el distribuidor." });
    }
};
