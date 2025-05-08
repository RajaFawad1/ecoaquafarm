'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';
import { Box, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import ErrorMessage from '@/components/ErrorMessage';
import StoreCard from '@/components/stores/StoreCard';
import StoreForm from '@/components/stores/StoreForm';
interface Store {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    manager?: string;
}


const StoresPage = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStores = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/stores');
            setStores(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
            setError('No se pudo cargar el listado de tiendas. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const addStore = async (newStore: Store) => {
        try {
            const response = await apiClient.post<Store>('/stores', newStore);
            setStores([...stores, response.data]); // Ahora TypeScript lo reconoce bien
        } catch (error) {
            console.error('Error adding store:', error);
            setError('No se pudo añadir la tienda. Inténtalo más tarde.');
        }
    };


    const deleteStore = (id: string) => {
        setStores((prevStores) => prevStores.filter((store) => store.id !== id));
    };

    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                🏪 Tiendas
            </Typography>

            {error && <ErrorMessage message={error} />}

            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2} sx={{ marginBottom: 4 }}>
                    {stores.map((store: any) => (
                        <Grid xs={12} sm={6} md={4} key={store.id}>
                            <StoreCard store={store} onDelete={deleteStore} />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Typography variant="h5" gutterBottom>
                Añadir Nueva Tienda
            </Typography>
            <StoreForm onSubmit={addStore} />
        </Box>
    );
};

export default StoresPage;
