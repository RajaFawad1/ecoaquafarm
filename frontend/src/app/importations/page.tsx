'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';
import { Box, Typography, CircularProgress, Grid, Card, CardContent, Button } from '@mui/material';
import ErrorMessage from '@/components/ErrorMessage';
import Link from 'next/link';

interface Importation {
    id: number;
    uuid: string;
    date: string;
}

const ImportationsPage = () => {
    const [importations, setImportations] = useState<Importation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchImportations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/importations');
            setImportations(response.data);
        } catch (error) {
            console.error('Error al obtener las importaciones:', error);
            setError('No se pudo cargar el listado de importaciones. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImportations();
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                📦 Importaciones
            </Typography>
            <Box mb={2}>
                <Link href="/importations/new" passHref legacyBehavior>
                    <Button variant="contained" color="secondary">
                        Crear Nueva Importación
                    </Button>
                </Link>
            </Box>
            {error && <ErrorMessage message={error} />}
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    {importations.map((importation) => (
                        <Grid item xs={12} sm={6} md={4} key={importation.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        UUID: {importation.uuid}
                                    </Typography>
                                    <Typography variant="body2">
                                        Fecha: {new Date(importation.date).toLocaleString('es-ES')}
                                    </Typography>
                                    <Box mt={2}>
                                        <Link href={`/importations/${importation.uuid}`} passHref legacyBehavior>
                                            <Button variant="contained" color="primary">
                                                Ver detalles [{importation.uuid}]
                                            </Button>
                                        </Link>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ImportationsPage;
