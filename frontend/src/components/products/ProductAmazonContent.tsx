// components/ProductAmazonContent.tsx
'use client';

import React from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';

export interface AmazonContent {
    descripcion: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    bullet5: string;
    bullet6: string;
    bullet7: string;
}

interface ProductAmazonContentProps {
    amazonContent: AmazonContent;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductAmazonContent: React.FC<ProductAmazonContentProps> = ({ amazonContent, onChange }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Contenido para Amazon
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Descripción del Producto"
                        name="descripcion"
                        fullWidth
                        multiline
                        rows={4}
                        value={amazonContent.descripcion}
                        onChange={onChange}
                        helperText="Ingrese la descripción completa para Amazon"
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Bullet 1"
                        name="bullet1"
                        fullWidth
                        multiline
                        rows={4}
                        value={amazonContent.bullet1}
                        onChange={onChange}
                        helperText="Primer bullet point"
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Bullet 2"
                        name="bullet2"
                        fullWidth
                        multiline
                        rows={4}
                        value={amazonContent.bullet2}
                        onChange={onChange}
                        helperText="Segundo bullet point"
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Bullet 3"
                        name="bullet3"
                        fullWidth
                        multiline
                        rows={4}
                        value={amazonContent.bullet3}
                        onChange={onChange}
                        helperText="Tercer bullet point"
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Bullet 4"
                        name="bullet4"
                        fullWidth
                        multiline
                        rows={4}
                        value={amazonContent.bullet4}
                        onChange={onChange}
                        helperText="Cuarto bullet point"
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Bullet 5"
                        name="bullet5"
                        fullWidth
                        multiline
                        rows={4}
                        value={amazonContent.bullet5}
                        onChange={onChange}
                        helperText="Quinto bullet point"
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Bullet 6"
                        name="bullet6"
                        fullWidth
                        multiline
                        rows={4}
                        value={amazonContent.bullet6}
                        onChange={onChange}
                        helperText="Sexto bullet point"
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Bullet 7"
                        name="bullet7"
                        fullWidth
                        multiline
                        rows={4}
                        value={amazonContent.bullet7}
                        onChange={onChange}
                        helperText="Séptimo bullet point"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductAmazonContent;
