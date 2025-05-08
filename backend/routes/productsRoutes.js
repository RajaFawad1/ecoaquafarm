const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const AmazonProductController = require('../controllers/Products/AmazonProductController');
const ProductFileController = require('../controllers/Products/ProductFileController'); // nuevo controlador
const { AmazonProduct, ProductDimension, PackageDimension } = require('../models');

// Configuración de almacenamiento con Multer con mensajes de debug
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Se asume que req.body.SKU o req.body.sku existe; de lo contrario, se asigna un valor por defecto
        const sku = req.body.SKU || req.body.sku || 'sinSKU';
        console.log("DEBUG Multer - destination: SKU recibido:", sku);
        const uploadPath = path.join(__dirname, '../public/uploads', sku);
        console.log("DEBUG Multer - destination: uploadPath generado:", uploadPath);

        // Crea la carpeta si no existe
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        console.log("DEBUG Multer - filename: Nombre original del archivo:", file.originalname);
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        console.log("DEBUG Multer - filename: Nombre generado:", filename);
        cb(null, filename);
    },
});

// Middleware para la subida de imágenes del producto (imagenPrincipal e imagenes)
const upload = multer({ storage }).fields([
    { name: 'imagenPrincipal', maxCount: 1 },
    { name: 'imagenes', maxCount: 10 }
]);

// Middleware para la subida de archivos adicionales (campo 'archivo')
const uploadFile = multer({ storage }).single('archivo');

/**
 * Crear un nuevo producto (imagen principal + galería opcional)
 */
router.post('/', upload, (req, res, next) => {
    console.log("DEBUG Route POST /products - req.body:", req.body);
    console.log("DEBUG Route POST /products - req.files:", req.files);
    next();
}, AmazonProductController.crear);

/**
 * Obtener todos los productos (con dimensiones asociadas)
 */
router.get('/', async (req, res) => {
    try {
        const products = await AmazonProduct.findAll({
            include: [
                { model: ProductDimension, as: "dimensionesProducto" },
                { model: PackageDimension, as: "dimensionesPaquete" },
            ],
        });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
});

/**
 * Obtener un producto por SKU o ASIN
 */
router.get('/:identifier', AmazonProductController.obtener);

/**
 * Actualizar un producto (imagen principal + galería opcional)
 */
router.put('/:identifier', upload, (req, res, next) => {
    console.log("DEBUG Route PUT /products - req.body:", req.body);
    console.log("DEBUG Route PUT /products - req.files:", req.files);
    next();
}, AmazonProductController.actualizar);

/**
 * Eliminar un producto
 */
router.delete('/:identifier', AmazonProductController.eliminar);

/**
 * Nuevo endpoint: Subir archivo adicional (certificado, pegatina, etc.)
 * URL: /products/file/
 */
router.post('/file', uploadFile, ProductFileController.upload);

module.exports = router;
