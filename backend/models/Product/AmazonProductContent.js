// models/AmazonProductContent.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const AmazonProductContent = sequelize.define("AmazonProductContent", {
    ASIN: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        comment: "Identificador del producto en Amazon"
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descripción completa del producto para Amazon"
    },
    bullet1: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Bullet point 1"
    },
    bullet2: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Bullet point 2"
    },
    bullet3: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Bullet point 3"
    },
    bullet4: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Bullet point 4"
    },
    bullet5: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Bullet point 5"
    },
    bullet6: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Bullet point 6"
    },
    bullet7: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Bullet point 7"
    }
}, {
    timestamps: true,
});

module.exports = AmazonProductContent;
