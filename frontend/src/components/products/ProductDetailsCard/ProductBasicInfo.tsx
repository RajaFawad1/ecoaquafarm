'use client';

import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ProductStickerPreview from './ProductStickerPreview';

interface ImportationSummary {
    importationId: number;
    importationDate: string;
    summary: {
        distribution: {
            invoiceRef: string;
            baseTotal: number;
            additionalForInvoice: number;
            finalInvoiceAmount: number;
            invoiceProportion: number;
            products: {
                modelo: string;
                producto: string;
                qty: string | number;
                productBase: number;
                productOvercost: number;
                additionalForProduct: number;
                finalProductCost: number;
            }[];
        }[];
    };
    invoices: {
        invoiceRef: string;
        amount: number;
        products: {
            sku: string;
            // Estos campos se usan sólo para mostrar el SKU en la factura,
            // los cálculos se extraerán del summary.distribution
        }[];
    }[];
}

interface ProductBasicInfoProps {
    nombreProducto: string;
    SKU: string;
    ASIN: string;
    tituloAmazon: string;
    marca: string;
    importations: ImportationSummary[]; // se espera un arreglo de importaciones
    categoria: string;
    createdAt?: string;
    updatedAt?: string;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
    nombreProducto,
    SKU,
    ASIN,
    tituloAmazon,
    marca,
    categoria,
    createdAt,
    importations,
}) => {
    const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A';

    return (
        <Box
            sx={{
                p: 3,
                backgroundColor: '#ffffff',
                borderRadius: 3,
                boxShadow: 3,
                mb: 3,
                gap: 2,
            }}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Columna Izquierda: Información Básica (80%) */}
                <Box sx={{ flex: 6 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontWeight: 'bold', color: '#333' }}
                    >
                        {nombreProducto}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>SKU:</strong> {SKU} | <strong>ASIN:</strong> {ASIN}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                        <strong>Título para Amazon:</strong> {tituloAmazon}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Marca:</strong> {marca}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Categoría:</strong> {categoria}
                        </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        Publicado el: {formattedDate}
                    </Typography>
                </Box>
                <Box sx={{ flex: 6, gap: 2, display: 'flex', flexDirection: 'column' }}>
                    {/* Columna Derecha: Acciones */}
                    <ProductStickerPreview
                        nombreProducto={nombreProducto}
                        SKU={SKU}
                        ASIN={ASIN}
                        marca={marca}
                        categoria={categoria}
                    />
                </Box>
                <Box sx={{ flex: 6, gap: 2, display: 'flex', flexDirection: 'column', pl: 5 }}>
                    <Typography variant="h6" gutterBottom>
                        Importaciones Relacionadas
                    </Typography>
                    {importations && importations.length > 0 ? (
                        importations.map((imp, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    p: 1,
                                    border: '1px solid #ccc',
                                    borderRadius: 1,
                                    pageBreakInside: 'avoid',
                                    breakInside: 'avoid',
                                }}
                            >
                                <Typography variant="body1">
                                    <strong>Importación:</strong> {imp.importationId} - Fecha: {' '}
                                    {new Date(imp.importationDate).toLocaleString('es-ES')}
                                </Typography>
                                {/* Mostrar información adicional de la importación (por ejemplo, resumen de productos) */}
                                {imp.summary && imp.summary.distribution && imp.summary.distribution.length > 0 && (
                                    <Box sx={{}}>
                                        {imp.summary.distribution.map((dist, j) => {
                                            // Buscamos la factura de esta distribución que coincida con alguna factura en imp.invoices
                                            const matchingInvoice = imp.invoices.find(
                                                (inv) => inv.invoiceRef === dist.invoiceRef
                                            );
                                            if (!matchingInvoice) return null;
                                            // Asumimos que en dist.products tenemos los datos calculados para el producto.
                                            if (!dist.products || dist.products.length === 0) return null;
                                            const prod = dist.products[0];
                                            const qty = Number(prod.qty) || 0;
                                            const productBase = Number(prod.productBase) || 0;
                                            const productOvercost = Number(prod.productOvercost) || 0;
                                            const additionalForProduct = Number(prod.additionalForProduct) || 0;
                                            const finalProductCost = Number(prod.finalProductCost) || 0;
                                            const baseOriginal = productBase - productOvercost;
                                            const basePerUnit = qty > 0 ? baseOriginal / qty : 0;
                                            const overcostPerUnit = qty > 0 ? productOvercost / qty : 0;
                                            const additionalPerUnit = qty > 0 ? additionalForProduct / qty : 0;
                                            const finalPerUnit = qty > 0 ? finalProductCost / qty : 0;
                                            return (
                                                <Box
                                                    key={j}
                                                    sx={{
                                                        mb: 2,
                                                        p: 1,
                                                        border: '1px dashed #ccc',
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2">
                                                        <strong>Factura:</strong> {matchingInvoice.invoiceRef} - Monto: {matchingInvoice.amount} €
                                                        {" - "}
                                                        <strong>Cantidad total:</strong> {qty}
                                                    </Typography>


                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        <strong>Costes Por Unidad:</strong>
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ ml: 2 }}>
                                                        Coste/U: {basePerUnit.toFixed(2)} €  {" - "} + {overcostPerUnit.toFixed(2)} €  {" - "}
                                                        Importacion/U: {additionalPerUnit.toFixed(2)} €  {" - "} <strong>Coste: {finalPerUnit.toFixed(2)} €</strong>
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                )}
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1">
                            No se encontraron importaciones para este producto.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProductBasicInfo;
