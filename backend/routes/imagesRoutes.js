// routes/imagesRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuración de almacenamiento dinámico con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Se espera que la URL incluya el SKU, por ejemplo: POST /api/images/upload/:sku
    const sku = req.params.sku;
    // Ruta donde se guardarán las imágenes para este SKU
    const uploadPath = path.join(__dirname, '../public/uploads', sku);
    // Si la carpeta no existe, la crea de forma recursiva
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Se genera un nombre único para cada archivo (puedes personalizar esta lógica)
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Ruta para subir una imagen (campo "image" en el formulario)
// La ruta incluye el SKU para determinar la carpeta de destino
router.post('/upload/:sku', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
  }
  // Construir la URL pública de la imagen subida
  const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${req.params.sku}/${req.file.filename}`;
  res.status(201).json({
    message: 'Imagen subida exitosamente',
    url: imageUrl,
  });
});

module.exports = router;
