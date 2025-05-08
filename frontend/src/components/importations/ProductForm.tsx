'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Divider } from '@mui/material';
import { ProductRow } from './InvoiceProductsTable';

interface ProductFormProps {
    onAddProduct: (product: ProductRow) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
    const [formData, setFormData] = useState<ProductRow>({
        modelo: '',
        producto: '',
        qty: '',
        cartonDimensions: '',
        cartonWeight: '',
        cbmPerCarton: '',
        pcsPerCarton: '',
        sku: '',
        hscode: '',
        ivaPercentage: '',
        unitPrice: '',
        unitsPurchased: '',
        boxDimensions: '',
        productWeight: '',
        description: '',
        aranceles: '',
    });

    const handleChange = (field: keyof ProductRow, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        onAddProduct(formData);
        setFormData({
            modelo: '',
            producto: '',
            qty: '',
            cartonDimensions: '',
            cartonWeight: '',
            cbmPerCarton: '',
            pcsPerCarton: '',
            sku: '',
            hscode: '',
            ivaPercentage: '',
            unitPrice: '',
            boxDimensions: '',
            productWeight: '',
            description: '',
            aranceles: '',
        });
    };

    return (
        <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Añadir Producto
            </Typography>

            <Typography fontSize={13} fontWeight="bold">Información Básica</Typography>
            <TextField fullWidth size="small" label="Modelo" value={formData.modelo} onChange={(e) => handleChange('modelo', e.target.value)} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="Producto" value={formData.producto} onChange={(e) => handleChange('producto', e.target.value)} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="SKU" value={formData.sku} onChange={(e) => handleChange('sku', e.target.value)} sx={{ mb: 1 }} />
            <Divider sx={{ my: 2 }} />

            <Typography fontSize={13} fontWeight="bold">Cantidad y Precios</Typography>
            <TextField fullWidth size="small" label="Qty" type="number" value={formData.qty} onChange={(e) => handleChange('qty', e.target.value)} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="Precio Unidad" type="number" value={formData.unitPrice} onChange={(e) => handleChange('unitPrice', e.target.value)} sx={{ mb: 1 }} />
            <Divider sx={{ my: 2 }} />

            <Typography fontSize={13} fontWeight="bold">Medidas del Cartón</Typography>
            <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={4}>
                    <TextField fullWidth size="small" label="Largo (cm)" onChange={(e) => handleChange('cartonDimensions', `${e.target.value}*${formData.cartonDimensions.split('*')[1] || ''}*${formData.cartonDimensions.split('*')[2] || ''}`)} value={formData.cartonDimensions.split('*')[0] || ''} />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth size="small" label="Ancho (cm)" onChange={(e) => handleChange('cartonDimensions', `${formData.cartonDimensions.split('*')[0] || ''}*${e.target.value}*${formData.cartonDimensions.split('*')[2] || ''}`)} value={formData.cartonDimensions.split('*')[1] || ''} />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth size="small" label="Alto (cm)" onChange={(e) => handleChange('cartonDimensions', `${formData.cartonDimensions.split('*')[0] || ''}*${formData.cartonDimensions.split('*')[1] || ''}*${e.target.value}`)} value={formData.cartonDimensions.split('*')[2] || ''} />
                </Grid>
            </Grid>
            <TextField fullWidth size="small" label="Peso del Cartón" type="number" value={formData.cartonWeight} onChange={(e) => handleChange('cartonWeight', e.target.value)} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="CBM/Cartón" type="number" value={formData.cbmPerCarton} onChange={(e) => handleChange('cbmPerCarton', e.target.value)} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="Pcs en cada Cartón" type="number" value={formData.pcsPerCarton} onChange={(e) => handleChange('pcsPerCarton', e.target.value)} sx={{ mb: 1 }} />
            <Divider sx={{ my: 2 }} />

            <Typography fontSize={13} fontWeight="bold">Medidas del Producto</Typography>
            <TextField fullWidth size="small" label="Medidas de la Caja" value={formData.boxDimensions} onChange={(e) => handleChange('boxDimensions', e.target.value)} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="Peso del Producto" type="number" value={formData.productWeight} onChange={(e) => handleChange('productWeight', e.target.value)} sx={{ mb: 1 }} />
            <Divider sx={{ my: 2 }} />

            <Typography fontSize={13} fontWeight="bold">Información Fiscal</Typography>
            <TextField fullWidth size="small" label="% IVA" type="number" value={formData.ivaPercentage} onChange={(e) => handleChange('ivaPercentage', e.target.value)} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="Aranceles (%)" type="number" value={formData.aranceles} onChange={(e) => handleChange('aranceles', e.target.value)} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="Hscode" value={formData.hscode} onChange={(e) => handleChange('hscode', e.target.value)} sx={{ mb: 1 }} />
            <Divider sx={{ my: 2 }} />

            <Typography fontSize={13} fontWeight="bold">Descripción</Typography>
            <TextField fullWidth size="small" label="Descripción" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} multiline rows={2} sx={{ mb: 1 }} />

            <Button fullWidth variant="contained" onClick={handleSubmit}>
                Añadir
            </Button>
        </Box>
    );
};

export default ProductForm;