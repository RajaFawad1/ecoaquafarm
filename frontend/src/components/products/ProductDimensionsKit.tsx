// components/ProductDimensionsKit.tsx
import React from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';

export interface DimensionsKit {
    packKit: string;
    cantidadProductos?: number;
    largo?: number;
    ancho?: number;
    alto?: number;
    pesoBrutoPack?: number;
    observaciones: string;
}

interface ProductDimensionsKitProps {
    dimensionsKit: DimensionsKit;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductDimensionsKit: React.FC<ProductDimensionsKitProps> = ({ dimensionsKit, onChange }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Dimensiones del Kit/Pack
            </Typography>
            <Grid container spacing={2}>
                {/* Fila: Identificador Autogenerado */}
                <Grid item xs={12}>
                    <TextField
                        label="Identificador del Pack (autogenerado)"
                        name="packKit"
                        fullWidth
                        value={dimensionsKit.packKit}
                        disabled
                        helperText="Este identificador se genera automáticamente a partir del SKU, dimensiones y cantidad"
                    />
                </Grid>

                {/* Fila: Cantidad de Productos y Peso Bruto */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Cantidad de Productos"
                        name="cantidadProductos"
                        type="number"
                        fullWidth
                        value={dimensionsKit.cantidadProductos || ''}
                        onChange={onChange}
                        helperText="Número de unidades incluidas en el pack"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Peso Bruto del Pack"
                        name="pesoBrutoPack"
                        type="number"
                        fullWidth
                        value={dimensionsKit.pesoBrutoPack || ''}
                        onChange={onChange}
                        helperText="Peso total del pack, en la unidad correspondiente"
                    />
                </Grid>

                {/* Fila: Dimensiones (Largo, Ancho, Alto) */}
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Largo (cm)"
                        name="largo"
                        type="number"
                        fullWidth
                        value={dimensionsKit.largo || ''}
                        onChange={onChange}
                        helperText="Medida en cm"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Ancho (cm)"
                        name="ancho"
                        type="number"
                        fullWidth
                        value={dimensionsKit.ancho || ''}
                        onChange={onChange}
                        helperText="Medida en cm"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Alto (cm)"
                        name="alto"
                        type="number"
                        fullWidth
                        value={dimensionsKit.alto || ''}
                        onChange={onChange}
                        helperText="Medida en cm"
                    />
                </Grid>

                {/* Fila: Observaciones */}
                <Grid item xs={12}>
                    <TextField
                        label="Observaciones"
                        name="observaciones"
                        fullWidth
                        multiline
                        rows={3}
                        value={dimensionsKit.observaciones}
                        onChange={onChange}
                        helperText="Detalles adicionales (protecciones, manuales, etc.)"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDimensionsKit;
