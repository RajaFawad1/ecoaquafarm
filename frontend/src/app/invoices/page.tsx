'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';
import {
    Box,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const InvoicesPage = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [stores, setStores] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [storeId, setStoreId] = useState('');
    const router = useRouter();

    const fetchInvoices = async (currentPage: number) => {
        setLoading(true);
        try {
            const response = await apiClient.get('/invoices', {
                params: { page: currentPage, limit: 50 },
            });

            // Ordenar facturas de mayor a menor por fecha
            const sortedInvoices = response.data.data.sort(
                (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setInvoices(sortedInvoices);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStores = async () => {
        try {
            const response = await apiClient.get('/stores');
            setStores(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };

    const fetchFilteredInvoices = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/invoices', {
                params: { month, year, storeId },
            });

            // Ordenar facturas de mayor a menor por fecha
            const sortedInvoices = response.data.data.sort(
                (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setInvoices(sortedInvoices);
        } catch (error) {
            console.error('Error fetching filtered invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices(page);
        fetchStores();
    }, [page]);

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleViewDetails = (invoiceId: string) => {
        router.push(`/invoices/${invoiceId}`);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                📄 Facturas
            </Typography>

            {/* Filtros por mes, año y tienda */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                <FormControl fullWidth>
                    <InputLabel>Tienda</InputLabel>
                    <Select value={storeId} onChange={(e) => setStoreId(e.target.value)}>
                        <MenuItem value="">Todas</MenuItem>
                        {stores.map((store) => (
                            <MenuItem key={store.id} value={store.id}>
                                {store.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Mes</InputLabel>
                    <Select value={month} onChange={(e) => setMonth(e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                            <MenuItem key={m} value={m}>
                                {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Año</InputLabel>
                    <Select value={year} onChange={(e) => setYear(e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                            <MenuItem key={y} value={y}>
                                {y}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchFilteredInvoices}
                    disabled={!month && !year && !storeId}
                >
                    Filtrar
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>📃 Número de Factura</TableCell>
                                <TableCell>💰 Total</TableCell>
                                <TableCell>🗓️ Fecha</TableCell>
                                <TableCell>👤 Cliente</TableCell>
                                <TableCell>🔍 Detalles</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>#{invoice.numberInvoice}</TableCell>
                                    <TableCell>€{invoice.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        {new Date(invoice.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.client ? invoice.client.nombre : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleViewDetails(invoice.id)}
                                        >
                                            📄 Ver Detalles
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Paginación */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 4,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    sx={{ marginRight: 2 }}
                >
                    ⬅️ Anterior
                </Button>
                <Typography variant="body1" sx={{ marginX: 2 }}>
                    Página {page} de {totalPages}
                </Typography>
                <Button
                    variant="outlined"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    Siguiente ➡️
                </Button>
            </Box>
        </Box>
    );
};

export default InvoicesPage;
