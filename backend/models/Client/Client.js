const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Client extends Model { }

    Client.init(
        {
            id: {
                type: DataTypes.STRING(36),
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            nombre: DataTypes.STRING,
            apellidos: DataTypes.STRING,
            telefono: DataTypes.STRING,
            direccion: DataTypes.STRING,
            codigoPostal: DataTypes.STRING,
            provincia: DataTypes.STRING,
            pais: DataTypes.STRING,
            tipoCliente: DataTypes.STRING,
            dniCif: DataTypes.STRING,
            email: DataTypes.STRING,
            mensaje: DataTypes.TEXT,
        },
        { sequelize, modelName: "Client", tableName: "clients" }
    );

    return Client;
};
