// ProductImagesInput.tsx
'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';

interface ProductImagesInputProps {
    // Puede recibir una URL (string) para datos iniciales o un File cuando se selecciona uno nuevo
    imagenPrincipal: File | string;
    imagenes: File[] | string[];
    onChange: (field: 'imagenPrincipal' | 'imagenes', value: any) => void;
}

const ProductImagesInput: React.FC<ProductImagesInputProps> = ({
    imagenPrincipal,
    imagenes,
    onChange,
}) => {
    // Para la imagen principal: si es string se usa para previsualización
    const [mainPreview, setMainPreview] = useState<string>(
        typeof imagenPrincipal === 'string' ? imagenPrincipal : ''
    );

    // Función que se asegura de obtener un arreglo de strings a partir de la prop "imagenes"
    const parseGalleryImages = (value: any): string[] => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        if (typeof value === 'string') {
            if (value.trim().startsWith('[')) {
                try {
                    const parsed = JSON.parse(value);
                    if (Array.isArray(parsed)) {
                        console.log('Parsed images from JSON:', parsed);
                        return parsed;
                    }
                } catch (e) {
                    console.error('Error al parsear imágenes:', e);
                }
            }
            return [value];
        }
        return [];
    };

    const initialGalleryPreviews = parseGalleryImages(imagenes);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>(initialGalleryPreviews);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

    // Manejador para la imagen principal: se usa URL.createObjectURL para previsualizar y se envía el File
    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setMainPreview(previewUrl);
            onChange('imagenPrincipal', file);
        }
    };

    // Manejador para la galería de imágenes: se almacenan los Files y se generan sus previsualizaciones
    const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files) as File[];
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setGalleryPreviews(prev => [...prev, ...newPreviews]);
            const updatedFiles = galleryFiles.concat(files);
            setGalleryFiles(updatedFiles);
            onChange('imagenes', updatedFiles);
        }
    };

    // Permite eliminar una imagen de la galería (tanto la previsualización como el File)
    const handleRemoveGalleryImage = (index: number) => {
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
        setGalleryFiles(prev => {
            const updatedFiles = prev.filter((_, i) => i !== index);
            setTimeout(() => {
                onChange('imagenes', updatedFiles);
            }, 0);
            return updatedFiles;
        });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Imagen Principal
            </Typography>
            <Box sx={{ border: '1px solid #ccc', padding: 2, mb: 2 }}>
                {mainPreview ? (
                    <Image
                        // Aquí se usa la URL con el prefijo "/public", lo que genera el error en Next.js
                        src={mainPreview}
                        alt="Imagen Principal"
                        width={500}   // Dimensión fija
                        height={300}  // Dimensión fija
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                ) : (
                    <Typography variant="body2">Previsualización no disponible</Typography>
                )}
            </Box>
            <Button variant="outlined" component="label">
                Subir Imagen Principal
                <input type="file" accept="image/*" hidden onChange={handleMainImageChange} />
            </Button>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Galería de Imágenes
            </Typography>
            <Box
                sx={{
                    border: '1px solid #ccc',
                    padding: 2,
                    mb: 2,
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                }}
            >
                {galleryPreviews.length > 0 ? (
                    galleryPreviews.map((src, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                            <Image
                                // También aquí se utiliza la URL con el prefijo "/public" y posibles espacios en el nombre del archivo
                                src={src}
                                alt={`Galería ${index}`}
                                width={150}  // Dimensión fija para cada imagen de la galería
                                height={150} // Dimensión fija para cada imagen de la galería
                                style={{ maxWidth: '150px', maxHeight: '150px' }}
                            />
                            <IconButton
                                onClick={() => handleRemoveGalleryImage(index)}
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2">Previsualización no disponible</Typography>
                )}
            </Box>
            <Button variant="outlined" component="label">
                Subir Galería de Imágenes
                <input type="file" accept="image/*" hidden multiple onChange={handleGalleryImagesChange} />
            </Button>
        </Box>
    );
};

export default ProductImagesInput;
