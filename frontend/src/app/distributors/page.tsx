'use client';

import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import DistributorList from '@/components/distributors/DistributorList';
import DistributorForm from '@/components/distributors/DistributorForm';
import apiClient from '@/utils/apiClient';

const DistributorsPage = () => {
    const [distributors, setDistributors] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchDistributors = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/distributors');
            setDistributors(response.data);
        } catch (error) {
            console.error('Error al obtener distribuidores:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDistributors();
    }, []);

    // Función para refrescar la lista cuando se cree un nuevo distribuidor
    const refreshDistributors = () => {
        fetchDistributors();
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={2}>
                {/* Columna Izquierda: Listado de Distribuidores */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <DistributorList distributors={distributors} loading={loading} />
                    </Paper>
                </Grid>
                {/* Columna Derecha: Formulario para Crear Distribuidor */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <DistributorForm onCreated={refreshDistributors} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DistributorsPage;
