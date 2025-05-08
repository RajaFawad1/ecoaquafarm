// controllers/Products/AmazonProductController.js
const {
    AmazonProduct,
    ProductDimension,
    PackageDimension,
    PackKitDimension,
    AmazonProductContent,
    FileSKU, Importation
} = require("../../models");
const { Op } = require("sequelize");

const AmazonProductController = {
    // Crear un nuevo producto junto con sus dimensiones y contenido para Amazon (opcional)
    async crear(req, res) {
        try {
            // Debug: Mostrar datos recibidos
            console.log("DEBUG: req.body:", req.body);
            console.log("DEBUG: req.files:", req.files);

            // Extraer datos del body (los demás campos se envían como texto)
            const {
                SKU,
                ASIN,
                nombreProducto,
                tituloAmazon,
                marca,
                urlAmazon, // Se envía desde el frontend
                categoria,
                dimensionesProducto,
                dimensionesPaquete,
                dimensionesPackKit, // Información para el pack/kit (con packKit autogenerado en el frontend)
                contenidoAmazon // Contenido para Amazon (descripción y bullet points)
            } = req.body;

            let imagenPrincipalURL = '';
            let imagenesURLs = [];

            // Si se envía archivo para la imagen principal, se genera la ruta
            if (req.files && req.files.imagenPrincipal && req.files.imagenPrincipal.length > 0) {
                imagenPrincipalURL = `/public/uploads/${SKU}/${req.files.imagenPrincipal[0].filename}`;
            }
            // Para la galería, se generan las rutas de cada archivo subido
            if (req.files && req.files.imagenes) {
                imagenesURLs = req.files.imagenes.map(file =>
                    `/public/uploads/${SKU}/${file.filename}`
                );
            }

            // Crear el registro del producto (se guardan solo las rutas de las imágenes)
            const producto = await AmazonProduct.create({
                SKU,
                ASIN,
                nombreProducto,
                tituloAmazon,
                marca,
                categoria,
                imagenPrincipal: imagenPrincipalURL,
                imagenes: imagenesURLs,
                urlAmazon, // Se utiliza el valor recibido
            });

            // Crear la dimensión del producto, si se envían datos
            if (dimensionesProducto) {
                await ProductDimension.create({
                    ASIN,
                    ...dimensionesProducto,
                });
            }

            // Crear la dimensión del paquete, si se envían datos
            if (dimensionesPaquete) {
                await PackageDimension.create({
                    ASIN,
                    ...dimensionesPaquete,
                });
            }

            // Crear la dimensión del pack/kit, si se envían datos
            if (dimensionesPackKit) {
                // Ignorar el ASIN recibido (si lo hubiera) y forzar el ASIN del producto
                const { ASIN: ignore, ...packData } = dimensionesPackKit;
                await PackKitDimension.create({
                    ASIN, // Forzamos el ASIN del producto
                    ...packData,
                });
            }

            // Crear el contenido para Amazon, si se envía
            if (contenidoAmazon) {
                // Se fuerza el ASIN del contenido para asociarlo correctamente
                await AmazonProductContent.create({
                    ASIN,
                    ...contenidoAmazon,
                });
            }

            return res.status(201).json({
                message: "Producto creado exitosamente",
                producto,
            });
        } catch (error) {
            console.error("DEBUG: Error en crear:", error);
            return res.status(500).json({
                message: "Error al crear el producto",
                error: error.message
            });
        }
    },

    // Actualizar un producto (y sus dimensiones y contenido) usando ASIN o SKU
    async actualizar(req, res) {
        try {
            console.log("DEBUG: req.body:", req.body);
            console.log("DEBUG: req.files:", req.files);

            const identifier = req.params.identifier;
            const {
                SKU,
                nombreProducto,
                tituloAmazon,
                marca,
                categoria,
                dimensionesProducto,
                dimensionesPaquete,
                dimensionesPackKit, // Información para el pack/kit
                contenidoAmazon // Contenido para Amazon
            } = req.body;

            const producto = await AmazonProduct.findOne({
                where: { [Op.or]: [{ ASIN: identifier }, { SKU: identifier }] },
            });
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            let imagenPrincipalURL = producto.imagenPrincipal;
            if (req.files && req.files.imagenPrincipal && req.files.imagenPrincipal.length > 0) {
                imagenPrincipalURL = `/public/uploads/${SKU}/${req.files.imagenPrincipal[0].filename}`;
            }

            let imagenesURLs = producto.imagenes;
            if (req.files && req.files.imagenes) {
                imagenesURLs = req.files.imagenes.map(file =>
                    `/public/uploads/${SKU}/${file.filename}`
                );
            }

            await producto.update({
                SKU,
                nombreProducto,
                tituloAmazon,
                marca,
                categoria,
                imagenPrincipal: imagenPrincipalURL,
                imagenes: imagenesURLs,
            });

            if (dimensionesProducto) {
                const prodDim = await ProductDimension.findOne({ where: { ASIN: producto.ASIN } });
                if (prodDim) {
                    await prodDim.update(dimensionesProducto);
                } else {
                    await ProductDimension.create({ ASIN: producto.ASIN, ...dimensionesProducto });
                }
            }

            if (dimensionesPaquete) {
                const packDim = await PackageDimension.findOne({ where: { ASIN: producto.ASIN } });
                if (packDim) {
                    await packDim.update(dimensionesPaquete);
                } else {
                    await PackageDimension.create({ ASIN: producto.ASIN, ...dimensionesPaquete });
                }
            }

            if (dimensionesPackKit) {
                const { ASIN: ignore, ...packData } = dimensionesPackKit;
                const packKitDim = await PackKitDimension.findOne({ where: { ASIN: producto.ASIN } });
                if (packKitDim) {
                    await packKitDim.update(packData);
                } else {
                    await PackKitDimension.create({ ASIN: producto.ASIN, ...packData });
                }
            }

            // Actualizar o crear el contenido para Amazon
            if (contenidoAmazon) {
                const content = await AmazonProductContent.findOne({ where: { ASIN: producto.ASIN } });
                if (content) {
                    await content.update(contenidoAmazon);
                } else {
                    await AmazonProductContent.create({
                        ASIN: producto.ASIN,
                        ...contenidoAmazon,
                    });
                }
            }

            return res.status(200).json({ message: "Producto actualizado exitosamente" });
        } catch (error) {
            console.error("DEBUG: Error en actualizar:", error);
            return res.status(500).json({
                message: "Error al actualizar el producto",
                error: error.message
            });
        }
    },

    async obtener(req, res) {
        try {
            const identifier = req.params.identifier;
            console.debug("Buscando producto con identificador:", identifier);

            // Buscar el producto por ASIN o SKU
            const producto = await AmazonProduct.findOne({
                where: {
                    [Op.or]: [{ ASIN: identifier }, { SKU: identifier }],
                },
                include: [
                    { model: ProductDimension, as: "dimensionesProducto" },
                    { model: PackageDimension, as: "dimensionesPaquete" },
                    { model: PackKitDimension, as: "dimensionesPackKit" },
                    { model: AmazonProductContent, as: "contenidoAmazon" },
                    { model: FileSKU, as: "archivosSKU" }
                ],
            });

            if (!producto) {
                console.debug("Producto no encontrado para:", identifier);
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            // Buscar todas las importaciones
            const importations = await Importation.findAll();
            console.debug(`Se encontraron ${importations.length} importaciones en total.`);

            // Filtrar aquellas importaciones que tengan facturas con un producto cuyo SKU coincida con identifier
            const importationsWithSKU = importations
                .map((imp) => {
                    // Aseguramos que invoices sea un array de objetos
                    let invoices;
                    try {
                        invoices = typeof imp.invoices === 'string'
                            ? JSON.parse(imp.invoices)
                            : imp.invoices;
                    } catch (err) {
                        console.error("Error parseando invoices en importación", imp.id, err);
                        invoices = [];
                    }
                    // Filtrar facturas que tengan productos con el SKU
                    const matchingInvoices = invoices.filter((invoice) => {
                        return invoice.products && invoice.products.some((p) => p.sku === identifier);
                    });
                    if (matchingInvoices.length > 0) {
                        // Aseguramos que summary se maneje como objeto
                        let summary;
                        try {
                            summary = typeof imp.summary === 'string'
                                ? JSON.parse(imp.summary)
                                : imp.summary;
                        } catch (parseError) {
                            console.error("Error al parsear summary en importación", imp.id, parseError);
                            summary = imp.summary;
                        }
                        console.debug(`Importación ${imp.id} tiene ${matchingInvoices.length} factura(s) con SKU ${identifier}`);
                        return {
                            importationId: imp.id,
                            importationDate: imp.date, // O puedes usar imp.createdAt si lo prefieres
                            summary, // Detalle de la importación (p. ej.: Detalle de Productos, costos totales, etc.)
                            invoices: matchingInvoices
                        };
                    }
                    return null;
                })
                .filter((item) => item !== null);

            console.debug("Importaciones filtradas con el SKU:", importationsWithSKU);

            // Combinar el producto y las importaciones en un único objeto de respuesta.
            const result = {
                ...producto.toJSON(),
                importations: importationsWithSKU
            };

            console.debug("Resultado final de la consulta:", result);
            return res.status(200).json(result);
        } catch (error) {
            console.error("DEBUG: Error en obtener:", error);
            return res.status(500).json({
                message: "Error al obtener el producto",
                error: error.message
            });
        }
    }

    ,

    async eliminar(req, res) {
        try {
            const identifier = req.params.identifier;
            const producto = await AmazonProduct.findOne({
                where: { [Op.or]: [{ ASIN: identifier }, { SKU: identifier }] },
            });
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            await ProductDimension.destroy({ where: { ASIN: producto.ASIN } });
            await PackageDimension.destroy({ where: { ASIN: producto.ASIN } });
            await PackKitDimension.destroy({ where: { ASIN: producto.ASIN } });
            await AmazonProductContent.destroy({ where: { ASIN: producto.ASIN } });
            await producto.destroy();
            return res.status(200).json({ message: "Producto eliminado exitosamente" });
        } catch (error) {
            console.error("DEBUG: Error en eliminar:", error);
            return res.status(500).json({
                message: "Error al eliminar el producto",
                error: error.message
            });
        }
    },
};

module.exports = AmazonProductController;
