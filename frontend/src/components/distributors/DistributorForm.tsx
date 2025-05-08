'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import apiClient from '@/utils/apiClient';
import ErrorMessage from '@/components/ErrorMessage';

interface DistributorFormProps {
    onCreated: () => void;
}

const DistributorForm: React.FC<DistributorFormProps> = ({ onCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        contactPerson: '',
        city: '',
        locality: '',
        phone: '',
        email: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        try {
            await apiClient.post('/distributors', formData);
            setSuccessMessage('Distribuidor creado exitosamente.');
            // Reinicia el formulario
            setFormData({
                name: '',
                country: '',
                contactPerson: '',
                city: '',
                locality: '',
                phone: '',
                email: '',
            });
            // Actualiza la lista de distribuidores en el backend
            onCreated();
        } catch (err) {
            console.error("Error creando distribuidor:", err);
            setError('No se pudo crear el distribuidor. Inténtalo más tarde.');
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Crear Nuevo Distribuidor
            </Typography>
            {error && <ErrorMessage message={error} />}
            {successMessage && (
                <Typography variant="body1" color="success.main" gutterBottom>
                    {successMessage}
                </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="País"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Persona de Contacto"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Ciudad"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Localidad"
                            name="locality"
                            value={formData.locality}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Teléfono"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Crear Distribuidor
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DistributorForm;
