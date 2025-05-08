// middleware/multerConfig.js
const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento: se guardarán los archivos en "public/files"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/files"));
    },
    filename: (req, file, cb) => {
        // Se genera un nombre único basado en la fecha y un número aleatorio
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });
module.exports = upload;
