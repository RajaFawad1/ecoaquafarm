'use client';

import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ProductForm from '@/components/products/ProductForm';
import apiClient from '@/utils/apiClient';
import ErrorMessage from '@/components/ErrorMessage';
import Image from 'next/image';

const NewProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [createdProduct, setCreatedProduct] = useState<any>(null);

    const handleCreateProduct = async (data: FormData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post('/products', data);
            // Se asume que el response.data contiene el objeto del producto creado
            setCreatedProduct(response.data.product || response.data);
            setOpenPopup(true);
        } catch (error) {
            console.error('Error creating product:', error);
            setError('No se pudo crear el producto. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Nuevo Producto
            </Typography>
            {error && <ErrorMessage message={error} />}
            {loading ? (
                <CircularProgress />
            ) : (
                <ProductForm onSubmit={handleCreateProduct} />
            )}

            <Dialog open={openPopup} onClose={handleClosePopup}>
                <DialogTitle>Producto creado exitosamente</DialogTitle>
                <DialogContent>
                    {createdProduct && (
                        <Box>
                            <Typography variant="subtitle1">
                                Nombre: {createdProduct.nombreProducto}
                            </Typography>
                            <Typography variant="subtitle2">
                                SKU: {createdProduct.SKU}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {createdProduct.tituloAmazon}
                            </Typography>
                            {createdProduct.imagenPrincipal && (
                                <Box sx={{ mt: 2 }}>
                                    <Image
                                        src={createdProduct.imagenPrincipal}
                                        alt="Imagen Principal"
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                </Box>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NewProductPage;
