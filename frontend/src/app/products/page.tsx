'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';
import { Box, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import ErrorMessage from '@/components/ErrorMessage';
import ProductCard from '@/components/products/ProductCard';
// Importa otros componentes si es necesario

interface Product {
    SKU: string;
    ASIN: string;
    nombreProducto: string;
    tituloAmazon: string;
    marca: string;
    categoria: string;
    // Otros campos según tu modelo
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('No se pudo cargar el listado de productos. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar el producto con confirmación y llamando al backend
    const handleDeleteProduct = async (SKU: string) => {
        const confirmed = window.confirm(
            '¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.'
        );
        if (!confirmed) return;

        try {
            await apiClient.delete(`/products/${SKU}`);
            // Actualizamos el estado filtrando el producto eliminado
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.SKU !== SKU)
            );
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('No se pudo eliminar el producto. Inténtalo más tarde.');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                📦 Productos
            </Typography>
            {error && <ErrorMessage message={error} />}
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2} sx={{ marginBottom: 4 }}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.SKU}>
                            <ProductCard
                                product={product}
                                onDelete={handleDeleteProduct}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ProductsPage;
