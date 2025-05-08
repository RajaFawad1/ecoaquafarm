'use client';

import React, { useState } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Image from 'next/image';

interface ProductImageSectionVerticalProps {
    imagenPrincipal?: string;
    imagenes?: string | string[];
    baseURL: string;
}

const ProductImageSectionVertical: React.FC<ProductImageSectionVerticalProps> = ({
    imagenPrincipal,
    imagenes,
    baseURL,
}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Combina la imagen principal y las adicionales en un arreglo.
    let thumbnails: string[] = [];
    if (imagenPrincipal) thumbnails.push(imagenPrincipal);
    if (imagenes) {
        const imgs = typeof imagenes === 'string' ? JSON.parse(imagenes) : imagenes;
        thumbnails = thumbnails.concat(imgs);
    }

    const [mainIndex, setMainIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    const getFullImageURL = (url?: string) => {
        if (!url) return '';
        return url.startsWith('http') ? url : `${baseURL}${url}`;
    };

    const handleThumbnailClick = (index: number) => {
        setMainIndex(index);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Se asume una relación de aspecto 16:9.
    // Puedes ajustar estos valores según las dimensiones reales de tus imágenes.
    const mainImageWidth = 1200;
    const mainImageHeight = 405;
    const thumbImageWidth = 600;
    const thumbImageHeight = 338;

    return (
        <>
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                {/* Imagen Principal */}
                <Box
                    sx={{
                        flex: 7,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 1,
                        cursor: 'pointer',
                    }}
                    onClick={handleOpenDialog}
                >
                    {thumbnails[mainIndex] && (
                        <Image
                            src={getFullImageURL(thumbnails[mainIndex])}
                            alt={`Imagen principal ${mainIndex}`}
                            width={mainImageWidth}
                            height={mainImageHeight}
                            // Se fuerza a que la imagen ocupe el 100% del ancho y ajuste el alto proporcionalmente.
                            style={{ width: '100%', height: 'auto' }}
                        />
                    )}
                </Box>

                {/* Carrusel Vertical de Miniaturas */}
                <Box
                    sx={{
                        flex: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        overflowY: 'auto',
                    }}
                >
                    {thumbnails.map((thumb, index) => (
                        <Box
                            key={index}
                            sx={{
                                border:
                                    index === mainIndex
                                        ? `2px solid ${theme.palette.primary.main}`
                                        : '1px solid #ccc',
                                borderRadius: 1,
                                overflow: 'hidden',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            <Image
                                src={getFullImageURL(thumb)}
                                alt={`Miniatura ${index}`}
                                width={thumbImageWidth}
                                height={thumbImageHeight}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Diálogo para pantalla completa */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullScreen={fullScreen} maxWidth="lg">
                <DialogContent sx={{ p: 0, backgroundColor: '#000' }}>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        {thumbnails[mainIndex] && (
                            <Image
                                src={getFullImageURL(thumbnails[mainIndex])}
                                alt="Imagen en pantalla completa"
                                width={mainImageWidth}
                                height={mainImageHeight}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', backgroundColor: '#000' }}>
                    <Button onClick={handleCloseDialog} variant="contained" color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductImageSectionVertical;
