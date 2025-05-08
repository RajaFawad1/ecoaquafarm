// models/Product/AmazonProduct.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const AmazonProduct = sequelize.define(
    "AmazonProduct",
    {
        SKU: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        ASIN: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        nombreProducto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tituloAmazon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagenPrincipal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagenes: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        // Campo para almacenar la URL enviada desde el frontend
        urlAmazon: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = AmazonProduct;
