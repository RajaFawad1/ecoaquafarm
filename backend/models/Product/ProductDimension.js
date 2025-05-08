// models/Product/ProductDimension.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const ProductDimension = sequelize.define(
    "ProductDimension",
    {
        ASIN: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true, // Cada registro se asocia al producto mediante el ASIN
        },
        longitudProducto: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        anchoProducto: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        alturaProducto: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        pesoNeto: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ProductDimension;
