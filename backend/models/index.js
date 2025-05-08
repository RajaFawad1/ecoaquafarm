const sequelize = require('../config/database');
const setupAssociations = require('./associations');

const models = setupAssociations(sequelize);

(async () => {
    try {
        console.log("Verificando claves foráneas antes de sincronizar...");

        // Verifica si `invoices_ibfk_3` existe antes de intentar eliminarla
        const [results] = await sequelize.query(`
            SELECT CONSTRAINT_NAME 
            FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
            WHERE TABLE_NAME = 'invoices' AND CONSTRAINT_NAME = 'invoices_ibfk_3'
        `);

        if (results.length > 0) {
            console.log("Eliminando invoices_ibfk_3...");
            await sequelize.query(`ALTER TABLE invoices DROP FOREIGN KEY invoices_ibfk_3`);
        } else {
            console.log("No se encontró invoices_ibfk_3. No se elimina.");
        }

        // Sincroniza la base de datos con `alter: true`
        await sequelize.sync({});

        console.log('✅ Base de datos sincronizada correctamente');
    } catch (error) {
        console.error('❌ Error al sincronizar la base de datos:', error);
    }
})();

module.exports = { sequelize, ...models };
