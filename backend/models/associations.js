// models/associations.js

// Modelos de AmazonProducts y dimensiones (se asume que ya fueron definidos con sequelize.define)
const AmazonProduct = require("./Product/AmazonProduct");
const ProductDimension = require("./Product/ProductDimension");
const PackageDimension = require("./Product/PackageDimension");
const FileSKU = require("./Product/FileSKU");

// Nuevos modelos para packkit y contenido de Amazon
const PackKitDimension = require("./Product/PackKitDimension");
const AmazonProductContent = require("./Product/AmazonProductContent");
const Distributor = require('./Distributor/Distributor');


// Modelos de facturación y relacionados (se espera que sean funciones que reciban el objeto sequelize)
const Client = require('./Client/Client');
const Invoice = require('./Invoice/Invoice');
const Store = require('./Store/Store');
const Product = require('./Invoice/Product');
const ReturnInvoice = require('./Invoice/returnInvoiceModel');
const FileRecord = require('./FileRecord');
const Importation = require('./Importation/Importation');

const setupAssociations = (sequelize) => {
    // ----------------------
    // Asociaciones de AmazonProducts
    // ----------------------
    AmazonProduct.hasOne(ProductDimension, {
        foreignKey: "ASIN",
        sourceKey: "ASIN",
        as: "dimensionesProducto",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    ProductDimension.belongsTo(AmazonProduct, {
        foreignKey: "ASIN",
        targetKey: "ASIN",
    });

    AmazonProduct.hasOne(PackageDimension, {
        foreignKey: "ASIN",
        sourceKey: "ASIN",
        as: "dimensionesPaquete",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PackageDimension.belongsTo(AmazonProduct, {
        foreignKey: "ASIN",
        targetKey: "ASIN",
    });

    // Asociación para PackKitDimension (nuevo modelo)
    AmazonProduct.hasOne(PackKitDimension, {
        foreignKey: "ASIN",
        sourceKey: "ASIN",
        as: "dimensionesPackKit",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PackKitDimension.belongsTo(AmazonProduct, {
        foreignKey: "ASIN",
        targetKey: "ASIN",
    });

    // Asociación para AmazonProductContent (nuevo modelo para descripción y bulletpoints)
    AmazonProduct.hasOne(AmazonProductContent, {
        foreignKey: "ASIN",
        sourceKey: "ASIN",
        as: "contenidoAmazon",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    AmazonProductContent.belongsTo(AmazonProduct, {
        foreignKey: "ASIN",
        targetKey: "ASIN",
    });

    AmazonProduct.hasMany(FileSKU, {
        foreignKey: "sku",       // Campo en FileSKU
        sourceKey: "SKU",        // Campo en AmazonProduct
        as: "archivosSKU",       // Alias para la asociación
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });

    FileSKU.belongsTo(AmazonProduct, {
        foreignKey: "sku",
        targetKey: "SKU",
        as: "amazonProduct",
    });

    // ----------------------
    // Asociaciones de facturación
    // ----------------------
    const ClientModel = Client(sequelize);
    const InvoiceModel = Invoice(sequelize);
    const StoreModel = Store(sequelize);
    const ProductModel = Product(sequelize);
    const ReturnInvoiceModel = ReturnInvoice(sequelize);

    // Asociación entre Invoice y Client (Factura - Cliente)
    InvoiceModel.belongsTo(ClientModel, {
        foreignKey: 'clientId',
        as: 'client',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    });

    // Asociación entre Invoice y Store (Factura - Tienda)
    InvoiceModel.belongsTo(StoreModel, {
        foreignKey: 'storeId',
        as: 'store',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    });

    // Asociación entre Invoice y Product (Factura - Productos)
    InvoiceModel.hasMany(ProductModel, {
        foreignKey: 'invoiceId',
        as: 'products'
    });
    ProductModel.belongsTo(InvoiceModel, {
        foreignKey: 'invoiceId',
        as: 'invoice'
    });

    // Asociación entre ReturnInvoice y Invoice (Factura de devolución - Factura original)
    ReturnInvoiceModel.belongsTo(InvoiceModel, {
        foreignKey: 'originalInvoiceId',
        as: 'originalInvoice',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    // Asociación entre ReturnInvoice y Store (Factura de devolución - Tienda)
    ReturnInvoiceModel.belongsTo(StoreModel, {
        foreignKey: 'storeId',
        as: 'store',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    const DistributorModel = Distributor(sequelize, sequelize.Sequelize.DataTypes);
    const ImportationModel = Importation(sequelize, sequelize.Sequelize.DataTypes);
    // Agrega los nuevos modelos
    return {
        // Modelos de AmazonProducts
        AmazonProduct,
        ProductDimension,
        PackageDimension,
        PackKitDimension,
        AmazonProductContent,
        FileRecord,
        // Modelos de facturación
        Client: ClientModel,
        Invoice: InvoiceModel,
        Store: StoreModel,
        Product: ProductModel,
        ReturnInvoice: ReturnInvoiceModel,
        FileSKU,

        Distributor: DistributorModel,
        Importation: ImportationModel,
    };
};

module.exports = setupAssociations;
