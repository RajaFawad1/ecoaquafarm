const { PackKitDimension } = require("../../models");

const PackKitDimensionController = {
    // Crear nuevas dimensiones para el pack/kit
    async crear(req, res) {
        try {
            const {
                packKit,
                skuPack,
                cantidadProductos,
                dimensionesPack,
                pesoBrutoPack,
                costoTotalPack,
                precioVentaPack,
                observaciones,
            } = req.body;

            const packDimension = await PackKitDimension.create({
                packKit,
                skuPack,
                cantidadProductos,
                dimensionesPack,
                pesoBrutoPack,
                costoTotalPack,
                precioVentaPack,
                observaciones,
            });

            return res.status(201).json({
                message: "Dimensiones del pack/kit creadas exitosamente",
                packDimension,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al crear las dimensiones del pack/kit",
                error: error.message
            });
        }
    },

    // Obtener las dimensiones del pack/kit por su identificador (packKit)
    async obtener(req, res) {
        try {
            const { packKit } = req.params;
            const packDimension = await PackKitDimension.findOne({ where: { packKit } });

            if (!packDimension) {
                return res.status(404).json({ message: "Dimensiones del pack/kit no encontradas" });
            }
            return res.status(200).json(packDimension);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al obtener las dimensiones del pack/kit",
                error: error.message
            });
        }
    },

    // Actualizar las dimensiones del pack/kit
    async actualizar(req, res) {
        try {
            const { packKit } = req.params;
            const packDimension = await PackKitDimension.findOne({ where: { packKit } });

            if (!packDimension) {
                return res.status(404).json({ message: "Dimensiones del pack/kit no encontradas" });
            }
            await packDimension.update(req.body);

            return res.status(200).json({
                message: "Dimensiones del pack/kit actualizadas exitosamente",
                packDimension,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al actualizar las dimensiones del pack/kit",
                error: error.message
            });
        }
    },

    // Eliminar las dimensiones del pack/kit
    async eliminar(req, res) {
        try {
            const { packKit } = req.params;
            const packDimension = await PackKitDimension.findOne({ where: { packKit } });

            if (!packDimension) {
                return res.status(404).json({ message: "Dimensiones del pack/kit no encontradas" });
            }
            await packDimension.destroy();

            return res.status(200).json({ message: "Dimensiones del pack/kit eliminadas exitosamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al eliminar las dimensiones del pack/kit",
                error: error.message
            });
        }
    },
};

module.exports = PackKitDimensionController;
