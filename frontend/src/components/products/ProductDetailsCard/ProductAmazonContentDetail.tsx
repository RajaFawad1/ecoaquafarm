// components/ProductAmazonContentDetail.tsx
'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

interface ProductAmazonContentDetailProps {
    descripcion: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    bullet5: string;
    bullet6: string;
    bullet7: string;
}

const ProductAmazonContentDetail: React.FC<ProductAmazonContentDetailProps> = ({
    descripcion,
    bullet1,
    bullet2,
    bullet3,
    bullet4,
    bullet5,
    bullet6,
    bullet7,
}) => {
    const bullets = [bullet1, bullet2, bullet3, bullet4, bullet5, bullet6, bullet7]
        .filter(bullet => bullet && bullet.trim() !== '');

    return (
        <Box sx={{ mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#fafafa' }}>
            <Typography variant="h5" gutterBottom>
                Contenido para Amazon
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="textSecondary">
                Descripción del Producto
            </Typography>
            <Typography variant="h5" gutterBottom>
                {descripcion}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom color="textSecondary">
                Puntos Clave
            </Typography>
            {bullets.length > 0 ? (
                <List>
                    {bullets.map((bullet, index) => (
                        <ListItem key={index} sx={{ pl: 0 }}>
                            <ListItemText
                                primary={
                                    <Typography variant="h5">
                                        • {bullet}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>

            ) : (
                <Typography variant="body2" color="textSecondary">
                    No se han definido puntos clave.
                </Typography>
            )}
        </Box>
    );
};

export default ProductAmazonContentDetail;
