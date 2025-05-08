'use client';

import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';

interface Product {
    SKU: string;
    ASIN: string;
    nombreProducto: string;
    tituloAmazon: string;
    marca: string;
    categoria: string;
    imagenPrincipal?: string;
    urlAmazon?: string;
}

interface ProductCardProps {
    product: Product;
    onDelete: (sku: string) => void;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
    // Construir la URL completa de la imagen principal
    const imageUrl =
        product.imagenPrincipal && !product.imagenPrincipal.startsWith('http')
            ? `${baseURL}${product.imagenPrincipal}`
            : product.imagenPrincipal || '/placeholder.png';

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
            {/* Imagen en la parte superior */}
            <Box
                sx={{
                    width: '100%',
                    maxHeight: 180,
                    overflow: 'hidden',
                }}
            >
                <img
                    src={imageUrl}
                    alt={product.nombreProducto}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
            {/* Contenido del producto */}
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {product.nombreProducto}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    SKU: {product.SKU}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ASIN: {product.ASIN}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Título para Amazon: {product.tituloAmazon}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Marca: {product.marca}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Categoría: {product.categoria}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    justifyContent: 'flex-end',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    pt: 1,
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => onDelete(product.SKU)}
                    sx={{ borderRadius: 1 }}
                    startIcon={<DeleteIcon />}
                >
                    Eliminar
                </Button>
                <Link href={`/products/${product.SKU}`} passHref legacyBehavior>
                    <Button variant="outlined" size="small" color="primary" sx={{ borderRadius: 1 }}>
                        👀 Ver Detalles
                    </Button>
                </Link>
                <Link href={`/products/${product.SKU}/edit`} passHref legacyBehavior>
                    <Button variant="outlined" size="small" color="secondary" sx={{ borderRadius: 1 }}>
                        ✏️ Editar
                    </Button>
                </Link>
                {product.urlAmazon && (
                    <Button
                        variant="outlined"
                        size="small"
                        color="inherit"
                        onClick={() =>
                            window.open(product.urlAmazon, '_blank', 'noopener,noreferrer')
                        }
                        sx={{ borderRadius: 1 }}
                    >
                        🛒 Ver en Amazon
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProductCard;
