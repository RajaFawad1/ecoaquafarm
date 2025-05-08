'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

interface PackageDimensionsProps {
    dimensionesPaquete: {
        longitudPaquete?: number;
        anchoPaquete?: number;
        alturaPaquete?: number;
        pesoBruto?: number;
        tipoEmbalaje?: string;
        cantidadPiezas?: number;
        unidadMedida?: string;
    };
}

const PackageDimensions: React.FC<PackageDimensionsProps> = ({ dimensionesPaquete }) => {
    return (
        <Box mt={3} p={2} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
                Dimensiones del Paquete
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Longitud
                    </Typography>
                    <Typography color="textSecondary" variant="h5" sx={{ fontWeight: 'bold' }}>
                        {dimensionesPaquete.longitudPaquete ?? 'N/A'} cm
                    </Typography>
                    <Typography variant="caption" color="textSecondary" >
                        Medida de la parte más larga del paquete.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Ancho
                    </Typography>
                    <Typography color="textSecondary" variant="h5" sx={{ fontWeight: 'bold' }}>
                        {dimensionesPaquete.anchoPaquete ?? 'N/A'} cm
                    </Typography>
                    <Typography variant="caption" color="textSecondary" >
                        Medida de la parte más ancha del paquete.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Altura
                    </Typography>
                    <Typography color="textSecondary" variant="h5" sx={{ fontWeight: 'bold' }}>
                        {dimensionesPaquete.alturaPaquete ?? 'N/A'} cm
                    </Typography>
                    <Typography variant="caption" color="textSecondary" >
                        Medida de la altura del paquete.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Peso Bruto
                    </Typography>
                    <Typography color="textSecondary" variant="h5" sx={{ fontWeight: 'bold' }}>
                        {dimensionesPaquete.pesoBruto ?? 'N/A'} kg
                    </Typography>
                    <Typography variant="caption" color="textSecondary" >
                        Peso total del paquete (incluye embalaje).
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" color="textPrimary">
                        Tipo de Embalaje
                    </Typography>
                    <Typography color="textSecondary" variant="h5" sx={{ fontWeight: 'bold' }}>
                        {dimensionesPaquete.tipoEmbalaje || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" >
                        Descripción del tipo de embalaje.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Cantidad de Piezas
                    </Typography>
                    <Typography color="textSecondary" variant="h5" sx={{ fontWeight: 'bold' }}>
                        {dimensionesPaquete.cantidadPiezas ?? 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" >
                        Número de piezas en el paquete.
                    </Typography>
                </Grid>

            </Grid>
        </Box>
    );
};

export default PackageDimensions;
