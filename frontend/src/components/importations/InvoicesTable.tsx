'use client';

import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Select, MenuItem, IconButton, Button, Box, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import apiClient from '@/utils/apiClient';
import ErrorMessage from '@/components/ErrorMessage';

export interface InvoiceRow {
    invoiceRef: string;
    distributorId: number | '';
    pdfUrl: string;
    amount: number | '';
    invoiceDate: string;
    description: string;
}

interface Distributor {
    id: number;
    name: string;
}

interface InvoicesTableProps {
    invoices: InvoiceRow[];
    onInvoicesChange: (invoices: InvoiceRow[]) => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ invoices, onInvoicesChange }) => {
    const [distributors, setDistributors] = useState<Distributor[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Cargar los distribuidores para el select
    useEffect(() => {
        const fetchDistributors = async () => {
            try {
                const response = await apiClient.get('/distributors');
                setDistributors(response.data);
            } catch (error) {
                console.error('Error al cargar distribuidores:', error);
                setError('Error al cargar distribuidores.');
            }
        };

        fetchDistributors();
    }, []);

    // Añadir una nueva fila (factura)
    const addInvoiceRow = () => {
        onInvoicesChange([
            ...invoices,
            { invoiceRef: '', distributorId: '', pdfUrl: '', amount: '', invoiceDate: '', description: '' }
        ]);
    };

    // Actualizar un campo de una fila
    const handleRowChange = (index: number, field: keyof InvoiceRow, value: any) => {
        const updatedRows = invoices.map((row, i) => {
            if (i === index) {
                return { ...row, [field]: value };
            }
            return row;
        });
        onInvoicesChange(updatedRows);
    };

    // Eliminar una fila
    const handleDeleteRow = (index: number) => {
        const updatedRows = invoices.filter((_, i) => i !== index);
        onInvoicesChange(updatedRows);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Facturas de la Importación
            </Typography>
            {error && <ErrorMessage message={error} />}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Referencia Factura</TableCell>
                            <TableCell>Distribuidor</TableCell>
                            <TableCell>URL PDF</TableCell>
                            <TableCell>Importe</TableCell>
                            <TableCell>Fecha Factura</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField
                                        value={row.invoiceRef}
                                        onChange={(e) => handleRowChange(index, 'invoiceRef', e.target.value)}
                                        placeholder="Referencia"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={row.distributorId}
                                        onChange={(e) => handleRowChange(index, 'distributorId', Number(e.target.value))}
                                        displayEmpty
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>Selecciona Distribuidor</em>
                                        </MenuItem>
                                        {distributors.map((d) => (
                                            <MenuItem key={d.id} value={d.id}>
                                                {d.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.pdfUrl}
                                        onChange={(e) => handleRowChange(index, 'pdfUrl', e.target.value)}
                                        placeholder="URL PDF"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        inputProps={{ step: "0.01" }}
                                        value={row.amount}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'amount',
                                                e.target.value === '' ? '' : parseFloat(e.target.value)
                                            )
                                        }
                                        placeholder="Importe"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="date"
                                        value={row.invoiceDate}
                                        onChange={(e) => handleRowChange(index, 'invoiceDate', e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.description}
                                        onChange={(e) => handleRowChange(index, 'description', e.target.value)}
                                        placeholder="Descripción"
                                        multiline
                                        rows={2}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteRow(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={addInvoiceRow}>
                    Añadir Factura
                </Button>
            </Box>
        </Box>
    );
};

export default InvoicesTable;
