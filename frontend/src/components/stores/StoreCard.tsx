'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import apiClient from '@/utils/apiClient';

const StoreCard = ({ store, onDelete }: { store: any; onDelete: (id: string) => void }) => {
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `¿Estás seguro de que deseas eliminar la tienda "${store.name}"?`
        );
        if (!confirmDelete) return;

        try {
            // Enviar solicitud al backend para eliminar la tienda
            await apiClient.delete(`/stores/${store.id}`);
            alert('Tienda eliminada con éxito.');
            onDelete(store.id); // Actualizar el estado en el componente padre
        } catch (error) {
            console.error('Error al eliminar la tienda:', error);
            alert('No se pudo eliminar la tienda. Inténtalo de nuevo.');
        }
    };

    return (
        <Card
            sx={{
                boxShadow: 4,
                borderRadius: 3,
                backgroundColor: '#f9f9f9',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative', // Necesario para posicionar el botón de eliminación
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
        >
            {/* Botón de eliminación en la esquina superior derecha */}
            <IconButton
                onClick={handleDelete}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    '&:hover': {
                        backgroundColor: '#d32f2f',
                    },
                }}
            >
                ❌
            </IconButton>

            <CardContent>
                {/* Nombre de la tienda */}
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    🏪 {store.name}
                </Typography>

                <Box sx={{ marginTop: 2 }}>
                    {/* Dirección */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        📍 <strong>Dirección:</strong> {store.address}
                    </Typography>

                    {/* Código Postal */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        📮 <strong>Código Postal:</strong> {store.billing_postal_code || 'N/A'}
                    </Typography>

                    {/* Teléfono */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        📞 <strong>Teléfono:</strong> {store.phone}
                    </Typography>

                    {/* Email */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        📧 <strong>Email:</strong> {store.email}
                    </Typography>

                    {/* Horarios */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        🕒 <strong>Horarios:</strong>{' '}
                        {store.opening_hours
                            ? JSON.parse(store.opening_hours)['lunes-viernes']
                            : 'N/A'}
                    </Typography>

                    {/* Dirección de Facturación */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        🏢 <strong>Facturación:</strong> {store.billing_address}
                    </Typography>

                    {/* CIF */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        🆔 <strong>CIF:</strong> {store.billing_cif}
                    </Typography>

                    {/* Provincia */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        🌍 <strong>Provincia:</strong> {store.province}
                    </Typography>

                    {/* Localidad */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        🏘️ <strong>Localidad:</strong> {store.locality}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StoreCard;
