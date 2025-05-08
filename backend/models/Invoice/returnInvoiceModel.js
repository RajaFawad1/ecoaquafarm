const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class ReturnInvoice extends Model { }

    ReturnInvoice.init(
        {
            id: {
                type: DataTypes.STRING(36),
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            originalInvoiceId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                references: {
                    model: "invoices", // Referencia a la tabla de facturas
                    key: "id",
                },
                onDelete: "CASCADE", // Si se elimina una factura original, se eliminan las devoluciones asociadas
                onUpdate: "CASCADE",
            },
            storeId: {
                type: DataTypes.STRING(36),
                allowNull: false,
                references: {
                    model: "stores", // Referencia a la tabla de tiendas
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            returnAmount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            returnDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            reason: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Otros campos que desees agregar
        },
        {
            sequelize,
            modelName: "ReturnInvoice",
            tableName: "return_invoices", // Nombre de la tabla en la base de datos
        }
    );

    return ReturnInvoice;
};
