require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
const { sequelize } = require("./models");

// Import routes
const clientRoutes = require("./routes/clientRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const storeRoutes = require("./routes/storeRoutes");
const returnsRoutes = require("./routes/returnInvoiceRoutes");
const productsRoutes = require("./routes/productsRoutes");
const filesRoutes = require("./routes/filesRoutes");
const distributorRoutes = require("./routes/distributorRoutes");
const importationsRoutes = require("./routes/importationRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files
app.use("/files", express.static(path.join(__dirname, "public", "files")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Health check endpoint
app.get("/", (req, res) => {
    const currentTime = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
    res.json({ 
        status: "running",
        message: "¡El backend está funcionando correctamente! 🟢",
        time: currentTime,
        version: process.env.npm_package_version
    });
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Authorization token required"
        });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false,
                message: "Invalid or expired token"
            });
        }
        req.user = user;
        next();
    });
};

// Role-based authorization middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        next();
    };
};

// Routes configuration
app.use("/api/auth", authRoutes); // Public auth routes

// Protected routes
app.use("/api/clients", authenticateToken, clientRoutes);
app.use("/api/invoices", authenticateToken, invoiceRoutes);
app.use("/api/stores", authenticateToken, storeRoutes);
app.use("/api/returns", authenticateToken, returnsRoutes);
app.use("/api/products", authenticateToken, productsRoutes);
app.use("/api/upload", authenticateToken, filesRoutes);
app.use("/api/distributors", authenticateToken, distributorRoutes);
app.use("/api/importations", authenticateToken, importationsRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found"
    });
});

// Database sync and server start
const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true })
    .then(() => {
        console.log("🟢 Database connected");
        app.listen(PORT, () => {
            const currentTime = new Date().toLocaleString("es-ES", { 
                timeZone: "Europe/Madrid",
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            console.log(`🟢 Server running on http://localhost:${PORT}`);
            console.log(`🕒 Hora actual: ${currentTime}`);
        });
    })
    .catch(err => {
        console.error("🔴 Database connection error:", err);
        process.exit(1);
    });

module.exports = app; 