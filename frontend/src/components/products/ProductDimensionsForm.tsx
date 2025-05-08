'use client';

import React from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';

interface DimensionsProducto {
    longitudProducto?: number;
    anchoProducto?: number;
    alturaProducto?: number;
    pesoNeto?: number;
}

interface DimensionsPaquete {
    longitudPaquete?: number;
    anchoPaquete?: number;
    alturaPaquete?: number;
    pesoBruto?: number;
    tipoEmbalaje?: string;
}

interface ProductDimensionsFormProps {
    dimensionesProducto: DimensionsProducto;
    dimensionesPaquete: DimensionsPaquete;
    onChangeDimensions: (
        group: 'producto' | 'paquete',
        field: keyof DimensionsProducto | keyof DimensionsPaquete,
        value: any
    ) => void;
}

const ProductDimensionsForm: React.FC<ProductDimensionsFormProps> = ({
    dimensionesProducto,
    dimensionesPaquete,
    onChangeDimensions,
}) => {
    return (
        <Box>
            {/* Dimensiones del Producto */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Dimensiones del Producto
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Las medidas de longitud, ancho y altura se expresan en centímetros (cm) y el peso neto en kilogramos (kg).
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Longitud"
                            name="longitudProducto"
                            value={dimensionesProducto.longitudProducto ?? ''}
                            onChange={(e) =>
                                onChangeDimensions('producto', 'longitudProducto', e.target.value ? Number(e.target.value) : undefined)
                            }
                            fullWidth
                            type="number"
                            helperText="Medida en cm"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Ancho"
                            name="anchoProducto"
                            value={dimensionesProducto.anchoProducto ?? ''}
                            onChange={(e) =>
                                onChangeDimensions('producto', 'anchoProducto', e.target.value ? Number(e.target.value) : undefined)
                            }
                            fullWidth
                            type="number"
                            helperText="Medida en cm"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Altura"
                            name="alturaProducto"
                            value={dimensionesProducto.alturaProducto ?? ''}
                            onChange={(e) =>
                                onChangeDimensions('producto', 'alturaProducto', e.target.value ? Number(e.target.value) : undefined)
                            }
                            fullWidth
                            type="number"
                            helperText="Medida en cm"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Peso Neto"
                            name="pesoNeto"
                            value={dimensionesProducto.pesoNeto ?? ''}
                            onChange={(e) =>
                                onChangeDimensions('producto', 'pesoNeto', e.target.value ? Number(e.target.value) : undefined)
                            }
                            fullWidth
                            type="number"
                            helperText="Medida en kg"
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Dimensiones del Paquete */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Dimensiones del Paquete
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Las medidas de longitud, ancho y altura se expresan en centímetros (cm) y el peso bruto en kilogramos (kg).
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Longitud del Paquete"
                            name="longitudPaquete"
                            value={dimensionesPaquete.longitudPaquete ?? ''}
                            onChange={(e) =>
                                onChangeDimensions('paquete', 'longitudPaquete', e.target.value ? Number(e.target.value) : undefined)
                            }
                            fullWidth
                            type="number"
                            helperText="Medida en cm"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Ancho del Paquete"
                            name="anchoPaquete"
                            value={dimensionesPaquete.anchoPaquete ?? ''}
                            onChange={(e) =>
                                onChangeDimensions('paquete', 'anchoPaquete', e.target.value ? Number(e.target.value) : undefined)
                            }
                            fullWidth
                            type="number"
                            helperText="Medida en cm"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Altura del Paquete"
                            name="alturaPaquete"
                            value={dimensionesPaquete.alturaPaquete ?? ''}
                            onChange={(e) =>
                                onChangeDimensions('paquete', 'alturaPaquete', e.target.value ? Number(e.target.value) : undefined)
                            }
                            fullWidth
                            type="number"
                            helperText="Medida en cm"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Peso Bruto"
                            name="pesoBruto"
                            value={dimensionesPaquete.pesoBruto ?? ''}
                            onChange={(e) =>
                                onChangeDimensions('paquete', 'pesoBruto', e.target.value ? Number(e.target.value) : undefined)
                            }
                            fullWidth
                            type="number"
                            helperText="Medida en kg"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Tipo de Embalaje"
                            name="tipoEmbalaje"
                            value={dimensionesPaquete.tipoEmbalaje || ''}
                            onChange={(e) => onChangeDimensions('paquete', 'tipoEmbalaje', e.target.value)}
                            fullWidth
                            helperText="Descripción del embalaje"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductDimensionsForm;
