'use client';

import React from 'react';
import { Grid, TextField } from '@mui/material';
import { ProductFormData } from './ProductForm';

interface ProductMainInfoProps {
    formData: ProductFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing?: boolean; // Indica si se está editando (SKU y ASIN se deshabilitan)
}

const ProductMainInfo: React.FC<ProductMainInfoProps> = ({ formData, onChange, isEditing = false }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="SKU"
                    name="SKU"
                    value={formData.SKU}
                    onChange={onChange}
                    fullWidth
                    required
                    disabled={isEditing} // Se deshabilita en edición
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="ASIN"
                    name="ASIN"
                    value={formData.ASIN}
                    onChange={onChange}
                    fullWidth
                    required
                    disabled={isEditing} // Se deshabilita en edición
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Nombre del Producto"
                    name="nombreProducto"
                    value={formData.nombreProducto}
                    onChange={onChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Título para Amazon"
                    name="tituloAmazon"
                    value={formData.tituloAmazon}
                    onChange={onChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Marca"
                    name="marca"
                    value={formData.marca}
                    onChange={onChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Categoría"
                    name="categoria"
                    value={formData.categoria}
                    onChange={onChange}
                    fullWidth
                    required
                />
            </Grid>
            {/* Nuevo campo para la URL de Amazon */}
            <Grid item xs={12}>
                <TextField
                    label="URL de Amazon"
                    name="urlAmazon"
                    value={formData.urlAmazon || ''}
                    onChange={onChange}
                    fullWidth
                    required
                />
            </Grid>
        </Grid>
    );
};

export default ProductMainInfo;
