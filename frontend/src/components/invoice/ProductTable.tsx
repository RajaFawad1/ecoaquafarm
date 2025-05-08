'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Grid,
    TextField,
} from '@mui/material';

const ProductTable = ({
    products,
    productFields,
    setProductFields,
    handleAddProductWithoutTax,
    handleAddProductWithTax,
}: any) => {
    return (
        <>
            {/* Tabla de productos */}
            <TableContainer component={Paper} sx={{ marginBottom: 2, marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>📝 Descripción</TableCell>
                            <TableCell>🔢 Cantidad</TableCell>
                            <TableCell>💰 Precio (Sin IVA)</TableCell>
                            <TableCell>📈 IVA (%)</TableCell>
                            <TableCell>🧾 Total (Con IVA)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.cantidad}</TableCell>
                                <TableCell>€{product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.iva}%</TableCell>
                                <TableCell>
                                    €
                                    {(
                                        product.cantidad *
                                        product.price *
                                        (1 + product.iva / 100)
                                    ).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Formulario de producto */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Descripción"
                        fullWidth
                        value={productFields.description}
                        onChange={(e) =>
                            setProductFields({ ...productFields, description: e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Cantidad"
                        type="number"
                        fullWidth
                        value={productFields.cantidad}
                        onChange={(e) =>
                            setProductFields({ ...productFields, cantidad: +e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Precio"
                        type="number"
                        fullWidth
                        value={productFields.price}
                        onChange={(e) =>
                            setProductFields({ ...productFields, price: +e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="IVA (%)"
                        type="number"
                        fullWidth
                        value={productFields.iva}
                        onChange={(e) =>
                            setProductFields({ ...productFields, iva: +e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddProductWithoutTax}
                        sx={{ marginTop: 2, marginRight: 2 }}
                    >
                        ➕ Añadir Producto (Sin IVA)
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddProductWithTax}
                        sx={{ marginTop: 2 }}
                    >
                        ➕ Añadir Producto (Con IVA Incluido)
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductTable;
