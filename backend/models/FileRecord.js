// models/FileRecord.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FileRecord = sequelize.define("FileRecord", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Nombre del archivo"
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Categoría del archivo"
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "URL del archivo (para descargar)"
    }
}, {
    timestamps: true,
});

module.exports = FileRecord;
