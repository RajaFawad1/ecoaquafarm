'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Box,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
    CircularProgress,
    Button,
    Collapse,
} from '@mui/material';
import apiClient from '@/utils/apiClient';
import PDFGenerator from '@/components/invoice/PDFGenerator';

const InvoiceDetailPage = () => {
    const { id } = useParams(); // Obtener el ID de la factura desde la URL
    const [invoice, setInvoice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showJson, setShowJson] = useState(false); // Control para mostrar/ocultar el JSON

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await apiClient.get(`/invoices/${id}`);
                setInvoice(response.data);
            } catch (error) {
                console.error('Error fetching invoice:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInvoice();
        }
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!invoice) {
        return (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
                <Typography variant="h6" color="error">
                    No se encontró la factura.
                </Typography>
            </Box>
        );
    }

    const year = new Date(invoice.date).getFullYear(); // Año de la factura

    // Calcular subtotal, IVA total y total
    const subtotal = invoice.products.reduce(
        (sum: number, product: any) => sum + product.cantidad * product.price,
        0
    );

    const totalIVA = invoice.products.reduce(
        (sum: number, product: any) =>
            sum + product.cantidad * product.price * (product.iva / 100),
        0
    );

    const totalConIVA = subtotal + totalIVA;

    return (
        <Box
            id="invoice" // ID para capturar el contenido
            sx={{
                padding: 4,
                maxWidth: 800,
                margin: '0 auto',
                backgroundColor: '#fff',
                boxShadow: 3,
                fontFamily: 'Arial, sans-serif',
                borderRadius: '8px',
            }}
        >
            {/* Encabezado de la Factura */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: 2,
                }}
            >
                Factura {year}/{invoice.numberInvoice}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{ textAlign: 'center', color: '#555', marginBottom: 4 }}
            >
                Fecha: {new Date(invoice.date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{ textAlign: 'center', color: '#555', marginBottom: 4 }}
            >
                Emitida por: {invoice.store.name}
            </Typography>

            {/* Información de la Tienda y del Cliente en Dos Columnas */}
            <Grid container spacing={2} sx={{ marginBottom: 4 }}>
                <Grid item xs={6}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Información de la Tienda
                    </Typography>
                    <Typography variant="body1">{invoice.store.name}</Typography>
                    <Typography variant="body1">{invoice.store.billing_cif}</Typography>
                    <Typography variant="body1">{invoice.store.address}</Typography>
                    <Typography variant="body1">
                        {invoice.store.locality} - {invoice.store.province}
                    </Typography>
                    <Typography variant="body1">
                        {invoice.store.billing_postal_code || 'Sin código postal'}
                    </Typography>
                    <Typography variant="body1">{invoice.store.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Información del Cliente
                    </Typography>
                    <Typography variant="body1">{invoice.client.nombre}</Typography>
                    <Typography variant="body1">{invoice.client.dniCif}</Typography>
                    <Typography variant="body1">
                        {invoice.client.direccion || 'Sin dirección'}
                    </Typography>
                    <Typography variant="body1">
                        {invoice.client.codigoPostal || 'Sin código postal'}
                    </Typography>
                    <Typography variant="body1">
                        {invoice.client.telefono || 'Sin teléfono'}
                    </Typography>
                </Grid>
            </Grid>


            <Divider sx={{ marginY: 2, backgroundColor: '#333', height: 2 }} />

            {/* Tabla de Productos */}
            <TableContainer component={Paper} sx={{ boxShadow: 'none', marginBottom: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Descripción</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                            <TableCell align="right">Precio (Sin IVA)</TableCell>
                            <TableCell align="right">IVA (%)</TableCell>
                            <TableCell align="right">Subtotal (Con IVA)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoice.products.map((product: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{product.description}</TableCell>
                                <TableCell align="center">{product.cantidad}</TableCell>
                                <TableCell align="right">€{product.price.toFixed(2)}</TableCell>
                                <TableCell align="right">{product.iva}%</TableCell>
                                <TableCell align="right">
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

            {/* Resumen del Pago */}
            <Grid container spacing={2} sx={{ marginTop: 4 }}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Método de Pago:
                    </Typography>
                    <Typography variant="body1">{invoice.paymentMethod}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body1">
                        Subtotal (Sin IVA): €{subtotal.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">IVA Total: €{totalIVA.toFixed(2)}</Typography>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: '#333', marginTop: 1 }}
                    >
                        Total: €{totalConIVA.toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>

            <Divider sx={{ marginY: 2, backgroundColor: '#333', height: 2 }} />

            {/* Botón para Descargar PDF */}
            <PDFGenerator invoice={invoice} />

            {/* Botón para mostrar/ocultar JSON */}
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowJson(!showJson)}
                >
                    {showJson ? 'Ocultar Detalles JSON' : 'Ver Detalles JSON'}
                </Button>
                <Collapse in={showJson} sx={{ marginTop: 2 }}>
                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            padding: 2,
                            borderRadius: 2,
                            maxHeight: 400,
                            overflowY: 'auto',
                            textAlign: 'left',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                        }}
                    >
                        <pre>{JSON.stringify(invoice, null, 2)}</pre>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    );
};

export default InvoiceDetailPage;
