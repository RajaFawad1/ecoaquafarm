const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Invoice extends Model { }

    Invoice.init(
        {
            id: {
                type: DataTypes.STRING(36),
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            numberInvoice: DataTypes.INTEGER,
            total: DataTypes.FLOAT,
            date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            paymentMethod: DataTypes.STRING,
            paymentDate: DataTypes.DATE,
            clientId: DataTypes.STRING,
            storeId: DataTypes.STRING,
        },
        { sequelize, modelName: "Invoice", tableName: "invoices" }
    );

    return Invoice;
};
