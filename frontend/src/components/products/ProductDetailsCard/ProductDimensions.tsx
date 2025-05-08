'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

interface ProductDimensionsProps {
    dimensionesProducto: {
        longitudProducto?: number;
        anchoProducto?: number;
        alturaProducto?: number;
        pesoNeto?: number;
    };
}

const ProductDimensions: React.FC<ProductDimensionsProps> = ({ dimensionesProducto }) => {
    return (
        <Box mt={3} p={2} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: 1, }}>
            <Typography variant="h6" gutterBottom>
                Dimensiones del Producto
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Longitud
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        {dimensionesProducto.longitudProducto ?? 'N/A'} cm
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Medida de la parte más larga del producto.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Ancho
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        {dimensionesProducto.anchoProducto ?? 'N/A'} cm
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Medida de la parte más ancha del producto.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Altura
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        {dimensionesProducto.alturaProducto ?? 'N/A'} cm
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Medida de la parte más alta del producto.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" color="textPrimary">
                        Peso Neto
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        {dimensionesProducto.pesoNeto ?? 'N/A'} kg
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Peso del producto sin embalaje.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDimensions;
