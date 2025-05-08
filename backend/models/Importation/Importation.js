// models/Importation/Importation.js
module.exports = (sequelize, DataTypes) => {
    const Importation = sequelize.define("Importation", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: "Identificador único de la importación"
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "Fecha de la importación"
        },
        invoices: {
            type: DataTypes.JSON,
            allowNull: false,
            comment: "Array de facturas, incluyendo productos y sobrecostes"
        },
        transportExpenses: {
            type: DataTypes.JSON,
            allowNull: false,
            comment: "Gastos de transporte aplicados a la importación"
        },
        taxExpenses: {
            type: DataTypes.JSON,
            allowNull: false,
            comment: "Impuestos aplicados a la importación"
        },
        summary: {
            type: DataTypes.JSON,
            allowNull: false,
            comment: "Resumen de importación calculado (totales y distribución)"
        }
    }, {
        timestamps: true,
        tableName: "importations"
    });

    return Importation;
};
