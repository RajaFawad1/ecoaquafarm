'use client';

import React, { useEffect, useState } from 'react';
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
    TextField,
    IconButton,
    Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import apiClient from '@/utils/apiClient';

const ClientsPage = () => {
    const [clients, setClients] = useState<any[]>([]);
    const [filteredClients, setFilteredClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await apiClient.get('/clients');
                setClients(response.data);
                setFilteredClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);

        const filtered = clients.filter((client) =>
            [client.nombre, client.telefono, client.dniCif]
                .filter(Boolean) // Ignorar campos nulos o indefinidos
                .some((field) => field.toLowerCase().includes(value))
        );
        setFilteredClients(filtered);
    };

    const toggleExpandRow = (id: string) => {
        setExpandedRow((prev) => (prev === id ? null : id));
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                👤 Clientes
            </Typography>
            <TextField
                label="Buscar cliente"
                variant="outlined"
                fullWidth
                value={search}
                onChange={handleSearch}
                placeholder="Buscar por nombre, teléfono o CIF"
                sx={{ marginBottom: 3 }}
            />
            {loading ? (
                <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>CIF/DNI</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredClients.map((client) => (
                                <React.Fragment key={client.id}>
                                    <TableRow>
                                        <TableCell>{client.nombre || 'N/A'}</TableCell>
                                        <TableCell>{client.telefono || 'N/A'}</TableCell>
                                        <TableCell>{client.dniCif || 'N/A'}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => toggleExpandRow(client.id)}>
                                                {expandedRow === client.id ? (
                                                    <ExpandLessIcon />
                                                ) : (
                                                    <ExpandMoreIcon />
                                                )}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            sx={{
                                                paddingBottom: 0,
                                                paddingTop: 0,
                                                backgroundColor: '#f9f9f9',
                                            }}
                                        >
                                            <Collapse
                                                in={expandedRow === client.id}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <Box
                                                    sx={{
                                                        margin: 2,
                                                        padding: 2,
                                                        backgroundColor: '#e9e9e9',
                                                        borderRadius: 2,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontFamily: 'monospace',
                                                            whiteSpace: 'pre-wrap',
                                                        }}
                                                    >
                                                        {JSON.stringify(client, null, 2)}
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default ClientsPage;
