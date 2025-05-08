const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Store extends Model { }

    Store.init(
        {
            id: {
                type: DataTypes.STRING(36),
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            opening_hours: DataTypes.JSON,
            whatsapp_phone: DataTypes.STRING,
            website: DataTypes.STRING,
            manager: DataTypes.STRING,
            capacity: DataTypes.STRING,
            notes: DataTypes.TEXT,
            billing_postal_code: DataTypes.STRING,
            province: DataTypes.STRING,
            locality: DataTypes.STRING,
            billing_name: DataTypes.STRING,
            billing_address: DataTypes.STRING,
            billing_cif: DataTypes.STRING,
        },
        { sequelize, modelName: "Store", tableName: "stores" }
    );

    return Store;
};
