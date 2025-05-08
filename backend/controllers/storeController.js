const { Store } = require("../models");

// Obtener todas las tiendas
exports.getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las tiendas." });
    }
};

// Crear una nueva tienda
exports.createStore = async (req, res) => {
    try {
        const store = await Store.create(req.body);
        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la tienda." });
    }
};

// Eliminar una tienda por ID

exports.deleteStore = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si existen facturas asociadas a la tienda
        const invoices = await Invoice.findAll({ where: { storeId: id } });

        if (invoices.length > 0) {
            return res.status(400).json({
                message: "No se puede eliminar la tienda porque tiene facturas asociadas.",
            });
        }

        // Eliminar la tienda
        const store = await Store.findByPk(id);
        if (!store) {
            return res.status(404).json({ message: "Tienda no encontrada." });
        }

        await store.destroy();
        res.status(200).json({ message: "Tienda eliminada con éxito." });
    } catch (error) {
        console.error("Error al eliminar la tienda:", error);
        res.status(500).json({ message: "Error al eliminar la tienda.", error: error.message });
    }
}