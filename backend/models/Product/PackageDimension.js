// models/PackageDimension.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const PackageDimension = sequelize.define(
    "PackageDimension",
    {
        ASIN: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        longitudPaquete: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        anchoPaquete: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        alturaPaquete: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        pesoBruto: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        tipoEmbalaje: {
            type: DataTypes.STRING,
            allowNull: true,
        },


    },
    {
        timestamps: true,
    }
);

module.exports = PackageDimension;
