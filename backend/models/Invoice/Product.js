const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Product extends Model { }

    Product.init(
        {
            id: {
                type: DataTypes.STRING(36),
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            iva: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            barcode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            devolucion: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            invoiceId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                references: {
                    model: "invoices",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        },
        { sequelize, modelName: "Product", tableName: "products" }
    );

    return Product;
};
