'use client';

import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Paper, Typography } from '@mui/material';

const StoreForm = ({ onSubmit }: { onSubmit: (newStore: any) => void }) => {
    const [newStore, setNewStore] = useState<{
        name: string;
        address: string;
        phone: string;
        email: string;
        opening_hours: string | any[];
        billing_address: string;
        billing_cif: string;
        province: string;
        locality: string;
        billing_postal_code: string;
    }>({
        name: '',
        address: '',
        phone: '',
        email: '',
        opening_hours: [],
        billing_address: '',
        billing_cif: '',
        province: '',
        locality: '',
        billing_postal_code: '', // Añadido el código postal
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Solo parsear si `opening_hours` es un string válido
            if (typeof newStore.opening_hours === 'string' && newStore.opening_hours.trim() !== '') {
                JSON.parse(newStore.opening_hours);
            }

            onSubmit(newStore);

            setNewStore({
                name: '',
                address: '',
                phone: '',
                email: '',
                opening_hours: '' as any, // ✅ Ahora se inicializa como string vacío
                billing_address: '',
                billing_cif: '',
                province: '',
                locality: '',
                billing_postal_code: '',
            });

        } catch {
            alert('Por favor, introduce un JSON válido en Horarios de Apertura.');
        }
    };


    return (
        <Paper
            elevation={4}
            sx={{
                padding: 4,
                borderRadius: 3,
                backgroundColor: '#f9f9f9',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
                Añadir Nueva Tienda
            </Typography>
            <Typography
                variant="body2"
                textAlign="center"
                color="textSecondary"
                sx={{ marginBottom: 3 }}
            >
                Completa los datos para añadir una nueva tienda al sistema.
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {Object.keys(newStore).map((key) => (
                        <Grid item xs={12} sm={6} key={key}>
                            <TextField
                                label={key
                                    .replace('_', ' ')
                                    .replace(/^\w/, (c) => c.toUpperCase())}
                                fullWidth
                                required={key !== 'phone' && key !== 'billing_postal_code'} // Código postal no es obligatorio
                                value={(newStore as any)[key]}
                                onChange={(e) =>
                                    setNewStore({ ...newStore, [key]: e.target.value })
                                }
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: '#616161', fontWeight: '500' },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: '#155a9c',
                            },
                        }}
                    >
                        Añadir Tienda
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default StoreForm;
