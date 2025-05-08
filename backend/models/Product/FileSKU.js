// models/FileSKU.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const FileSKU = sequelize.define(
    "FileSKU",
    {
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true, // Activa la gestión automática de createdAt y updatedAt
    }
);

module.exports = FileSKU;
