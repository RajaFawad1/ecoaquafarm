'use client';

import React from 'react';
import { Box, Typography, Divider, Grid, Paper } from '@mui/material';
import InvoiceProductsTable, { ProductRow } from './InvoiceProductsTable';
import ProductForm from './ProductForm';

export interface InvoiceRowWithProducts {
    invoiceRef: string;
    amount: number; // Se añade el importe total de la factura
    products: ProductRow[];
}

interface ProductsImportationInvoicesProps {
    invoices: InvoiceRowWithProducts[];
    onInvoicesChange: (updatedInvoices: InvoiceRowWithProducts[]) => void;
}

const ProductsImportationInvoices: React.FC<ProductsImportationInvoicesProps> = ({ invoices = [], onInvoicesChange }) => {
    // Actualiza los productos para la factura en el índice indicado
    const handleProductsChange = (index: number, products: ProductRow[]) => {
        const updatedInvoices = invoices.map((invoice, i) => {
            if (i === index) {
                return { ...invoice, products };
            }
            return invoice;
        });
        onInvoicesChange(updatedInvoices);
    };

    const handleAddProduct = (index: number, newProduct: ProductRow) => {
        const updatedInvoices = invoices.map((invoice, i) => {
            if (i === index) {
                // Aseguramos que siempre exista un array
                return {
                    ...invoice,
                    products: [
                        ...(invoice?.products ?? []),
                        newProduct
                    ]
                };
            }
            return invoice;
        });
        onInvoicesChange(updatedInvoices);
    };

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" gutterBottom>
                Productos de cada Factura
            </Typography>
            {invoices.map((invoice, index) => (
                <Box key={index} sx={{ marginBottom: 4, border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Factura: {invoice.invoiceRef || `Factura ${index + 1}`}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9.5}>
                            <InvoiceProductsTable
                                products={invoice?.products}
                                onProductsChange={(products) => handleProductsChange(index, products)}
                                invoiceAmount={invoice.amount} // Pasamos el importe total de la factura
                            />
                        </Grid>
                        <Grid item xs={12} md={2.5}>
                            <Paper sx={{ padding: 2 }}>
                                <ProductForm onAddProduct={(product) => handleAddProduct(index, product)} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginTop: 2 }} />
                </Box>
            ))}
        </Box>
    );
};

export default ProductsImportationInvoices;
