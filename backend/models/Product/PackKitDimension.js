// models/PackKitDimension.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const PackKitDimension = sequelize.define(
    "PackKitDimension",
    {
        // Identificador autogenerado del pack (clave primaria)
        packKit: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: "Identificador autogenerado a partir del SKU, dimensiones y cantidad"
        },
        // ASIN para relacionarlo con el producto
        ASIN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidadProductos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Número de unidades incluidas en el pack"
        },
        // Dimensiones individuales (en cm)
        largo: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: "Largo del pack en cm"
        },
        ancho: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: "Ancho del pack en cm"
        },
        alto: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: "Alto del pack en cm"
        },
        pesoBrutoPack: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: "Peso total del pack (unidades + embalaje)"
        },
        precioVentaPack: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: "Precio sugerido de venta del pack completo en Amazon"
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Detalles adicionales (protecciones, manuales, etc.)"
        }
    },
    {
        timestamps: true,
    }
);

module.exports = PackKitDimension;
