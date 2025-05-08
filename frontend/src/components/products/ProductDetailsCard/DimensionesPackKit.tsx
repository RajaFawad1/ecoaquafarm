// components/ProductDetailsCard/DimensionesPackKit.tsx
'use client';

import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';

export interface DimensionesPackKitProps {
    packKit: string;
    cantidadProductos?: number;
    largo?: number;
    ancho?: number;
    alto?: number;
    pesoBrutoPack?: number;
    precioVentaPack?: number | null;
    observaciones: string;
    ASIN: string;
}

interface Props {
    dimensionesPackKit: DimensionesPackKitProps;
}

const DimensionesPackKit: React.FC<Props> = ({ dimensionesPackKit }) => {
    const { packKit, cantidadProductos, largo, ancho, alto, pesoBrutoPack, precioVentaPack, observaciones } = dimensionesPackKit;
    return (
        <Box sx={{ mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h5" gutterBottom>
                📏 Dimensiones del Pack/Kit
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Información detallada del pack/kit del producto.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        <strong>🔑 Identificador:</strong> {packKit}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Este identificador se generó automáticamente.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">
                        <strong>📦 Cantidad de Productos:</strong> {cantidadProductos}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Número de unidades incluidas en el pack.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">
                        <strong>📐 Dimensiones:</strong> {largo} cm (L) x {ancho} cm (A) x {alto} cm (H)
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Medidas del pack/kit en centímetros.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">
                        <strong>⚖️ Peso Bruto:</strong> {pesoBrutoPack}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Peso total del pack (incluye embalaje).
                    </Typography>
                </Grid>
                {precioVentaPack !== null && (
                    <Grid item xs={6}>
                        <Typography variant="h5">
                            <strong>💲 Precio de Venta:</strong> {precioVentaPack}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Precio sugerido de venta del pack.
                        </Typography>
                    </Grid>
                )}
                {observaciones && (
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            <strong>📝 Observaciones:</strong> {observaciones}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Información adicional sobre el pack.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default DimensionesPackKit;
