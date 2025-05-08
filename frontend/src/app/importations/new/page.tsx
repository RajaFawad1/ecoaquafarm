'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import ErrorMessage from '@/components/ErrorMessage';
import InvoicesTable from '@/components/importations/InvoicesTable';
import TransportExpensesTable from '@/components/importations/TransportExpensesTable';
import ProductsImportationInvoices from '@/components/importations/ProductsImportationInvoices';
import TaxExpensesTable, { TaxExpense } from '@/components/importations/TaxExpensesTable';
import ImportationSummary from '@/components/importations/ImportationSummary';
import apiClient from '@/utils/apiClient';
import { computeImportationSummary, InvoiceRow, TransportExpense } from '@/helpers/importationHelpers';

const predefinedExpenses: TransportExpense[] = [
    { name: '📦 EXW a FOB', value: 0.0, fixed: true, description: '' },
    { name: '🚢 Flete', value: 0.0, fixed: true, description: '' },
    { name: '🚛 Transporte local', value: 0.0, fixed: true, description: '' },
    { name: '📬 Entrega', value: 0.0, fixed: true, description: '' },
    { name: '🔒 Seguro', value: 0.0, fixed: true, description: '' },
];

const predefinedTaxes: TaxExpense[] = [
    { name: 'IVA de Aduana', value: 0.0, fixed: false, description: '' },
    { name: 'Impuesto Extra', value: 0.0, fixed: false, description: '' },
];

const NewImportationPage = () => {
    const now = new Date().toISOString().slice(0, 16);
    const [date, setDate] = useState(now);
    const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
    const [transportExpenses, setTransportExpenses] = useState(predefinedExpenses);
    const [taxes, setTaxes] = useState<TaxExpense[]>(predefinedTaxes);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Usamos el helper para calcular el resumen en el componente padre
    const summary = useMemo(
        () => computeImportationSummary(invoices, transportExpenses, taxes),
        [invoices, transportExpenses, taxes]
    );

    // Al enviar el formulario, incluimos también el resumen calculado
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        console.log("entraaa")
        try {
            const payload = {
                date: date ? new Date(date) : new Date(),
                invoices,
                transportExpenses,
                taxExpenses: taxes,
                summary, // Información ya procesada
            };

            const response = await apiClient.post('/importations', payload);
            router.push(`/importations/${response.data.uuid}`);
        } catch (error) {
            console.error('Error al crear la importación:', error);
            setError('No se pudo crear la importación. Inténtalo más tarde.');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Crear Nueva Importación
            </Typography>
            {error && <ErrorMessage message={error} />}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Fecha"
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginBottom: 2 }}
                />

                <Grid container spacing={2}>
                    {/* Columnas para ingreso de datos */}
                    <Grid item xs={12} md={8}>
                        <InvoicesTable invoices={invoices} onInvoicesChange={setInvoices} />
                        <TransportExpensesTable
                            expenses={transportExpenses}
                            onExpensesChange={setTransportExpenses}
                        />
                        <TaxExpensesTable taxes={taxes} onTaxesChange={setTaxes} />
                        <ProductsImportationInvoices invoices={invoices} onInvoicesChange={setInvoices} />
                    </Grid>

                    {/* Columna de Resumen: aquí se le pasa el resumen ya calculado */}
                    <Grid item xs={12} md={4}>
                        <ImportationSummary summary={summary} />
                    </Grid>
                </Grid>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Crear Importación
                </Button>
            </Box>

            <Box mt={2}>
                <Button variant="outlined" onClick={() => router.back()}>
                    Volver
                </Button>
            </Box>
        </Box>
    );
};

export default NewImportationPage;
