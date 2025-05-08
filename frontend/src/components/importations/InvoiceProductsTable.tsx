'use client';

import React, { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface ProductRow {
    modelo: string;
    producto: string;
    qty: number | '';
    cartonDimensions: string; // Ej: "L*W*H" en cm
    cartonWeight: number | '';
    cbmPerCarton: number | '';
    pcsPerCarton: number | '';
    sku: string;
    hscode: string;
    ivaPercentage: number | '';
    aranceles: number | '';
    unitPrice: number | '';
    boxDimensions: string; // Ej: "L*W*H" para la caja
    productWeight: number | '';
    description: string;
}

interface InvoiceProductsTableProps {
    products: ProductRow[];
    onProductsChange: (products: ProductRow[]) => void;
    invoiceAmount: number; // Importe total de la factura (Y €)
}

const InvoiceProductsTable: React.FC<InvoiceProductsTableProps> = ({
    products = [],
    onProductsChange,
    invoiceAmount,
}) => {
    const handleDeleteProduct = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        onProductsChange(updatedProducts);
    };

    // Cálculo del coste total (sumatorio de qty * unitPrice)
    const totalCost = useMemo(() => {
        return products.reduce((acc, product) => {
            const qty = Number(product.qty) || 0;
            const price = Number(product.unitPrice) || 0;
            return acc + qty * price;
        }, 0);
    }, [products]);

    return (
        <Box sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
                Coste total de los productos: {totalCost}€ de {invoiceAmount}€ de la factura
            </Typography>

            <Typography variant="h6" gutterBottom>
                Productos de la Factura
            </Typography>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Modelo</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Hscode</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>% IVA</TableCell>
                            <TableCell>% Aranceles</TableCell>
                            <TableCell>Cartón (L*W*H)</TableCell>
                            <TableCell>Peso Cartón</TableCell>
                            <TableCell>CBM</TableCell>
                            <TableCell>Pcs/Cartón</TableCell>
                            <TableCell>Caja Prod (L*W*H)</TableCell>
                            <TableCell>Peso Prod.</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.modelo}</TableCell>
                                <TableCell>{product.producto}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.hscode}</TableCell>
                                <TableCell>{product.qty}</TableCell>
                                <TableCell>{product.unitPrice}</TableCell>
                                <TableCell>{product.ivaPercentage}</TableCell>
                                <TableCell>{product.aranceles}</TableCell>
                                <TableCell>{product.cartonDimensions}</TableCell>
                                <TableCell>{product.cartonWeight}</TableCell>
                                <TableCell>{product.cbmPerCarton}</TableCell>
                                <TableCell>{product.pcsPerCarton}</TableCell>
                                <TableCell>{product.boxDimensions}</TableCell>
                                <TableCell>{product.productWeight}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleDeleteProduct(index)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default InvoiceProductsTable;
