'use client';

import React from 'react';
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const InvoiceDetailsForm = ({ invoiceData, setInvoiceData, stores }: any) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>💳 Método de Pago</InputLabel>
                        <Select
                            value={invoiceData.paymentMethod}
                            onChange={(e) =>
                                setInvoiceData({ ...invoiceData, paymentMethod: e.target.value })
                            }
                        >
                            <MenuItem value="tarjeta">💳 Tarjeta</MenuItem>
                            <MenuItem value="paypal">💻 PayPal</MenuItem>
                            <MenuItem value="amazon">🛍️ Amazon</MenuItem>
                            <MenuItem value="efectivo">💵 Efectivo</MenuItem>
                            <MenuItem value="transferencia">🏦 Transferencia</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="📅 Fecha de Pago"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={invoiceData.paymentDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) =>
                            setInvoiceData({ ...invoiceData, paymentDate: e.target.value })
                        }
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>🏪 Tienda</InputLabel>
                        <Select
                            value={invoiceData.storeId}
                            onChange={(e) =>
                                setInvoiceData({ ...invoiceData, storeId: e.target.value })
                            }
                        >
                            {stores.map((store: any) => (
                                <MenuItem key={store.id} value={store.id}>
                                    🏪 {store.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
};

export default InvoiceDetailsForm;
