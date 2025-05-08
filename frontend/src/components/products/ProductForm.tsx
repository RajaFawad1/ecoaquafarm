'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ProductMainInfo from './ProductMainInfo';
import ProductImagesInput from './ProductImagesInput';
import ProductDimensionsForm from './ProductDimensionsForm';
import ProductDimensionsKit, { DimensionsKit } from './ProductDimensionsKit';
import ProductAmazonContent from './ProductAmazonContent';
import { ProductFormData } from '@/types/ProductFormTypes';

interface ProductFormProps {
    onSubmit: (data: FormData) => void;
    initialData?: ProductFormData; // datos iniciales en caso de edición
}

// Valores iniciales para un nuevo producto, incluyendo dimensiones y contenido para Amazon
const emptyFormData: ProductFormData = {
    SKU: '',
    ASIN: '',
    nombreProducto: '',
    tituloAmazon: '',
    marca: '',
    categoria: '',
    imagenPrincipal: '',
    imagenes: [],
    dimensionesProducto: {
        longitudProducto: undefined,
        anchoProducto: undefined,
        alturaProducto: undefined,
        pesoNeto: undefined,
    },
    dimensionesPaquete: {
        longitudPaquete: undefined,
        anchoPaquete: undefined,
        alturaPaquete: undefined,
        pesoBruto: undefined,
        tipoEmbalaje: '',
        cantidadPiezas: undefined,
        unidadMedida: '',
    },
    // Dimensiones del kit/pack
    dimensionesPackKit: {
        packKit: '',
        cantidadProductos: undefined,
        largo: undefined,
        ancho: undefined,
        alto: undefined,
        pesoBrutoPack: undefined,
        observaciones: '',
        ASIN: '' // Opcional, si se requiere asociarlo al producto
    },
    // Contenido para Amazon (descripción y bullet points)
    contenidoAmazon: {
        descripcion: '',
        bullet1: '',
        bullet2: '',
        bullet3: '',
        bullet4: '',
        bullet5: '',
        bullet6: '',
        bullet7: '',
    }
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<ProductFormData>(initialData || emptyFormData);

    // Si se recibe initialData, se actualiza el estado
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    // Generar automáticamente el packKit
    useEffect(() => {
        const { SKU } = formData;
        const { largo, ancho, alto, cantidadProductos, pesoBrutoPack, packKit } = formData.dimensionesPackKit;
        if (SKU && largo && ancho && alto && cantidadProductos && pesoBrutoPack) {
            const generated = `${SKU}-L${largo}-A${ancho}-H${alto}-W${pesoBrutoPack}-U${cantidadProductos}`;
            // Solo actualiza si el valor generado es distinto
            if (generated !== packKit) {
                setFormData(prev => ({
                    ...prev,
                    dimensionesPackKit: {
                        ...prev.dimensionesPackKit,
                        packKit: generated,
                    },
                }));
            }
        }
    }, [
        formData.SKU,
        formData.dimensionesPackKit.largo,
        formData.dimensionesPackKit.ancho,
        formData.dimensionesPackKit.alto,
        formData.dimensionesPackKit.cantidadProductos,
        formData.dimensionesPackKit.pesoBrutoPack,
        formData.dimensionesPackKit.packKit, // Aunque aquí es opcional, ya que se compara dentro del efecto
    ]);


    const handleMainInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImagesChange = (field: 'imagenPrincipal' | 'imagenes', value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleDimensionsChange = (
        group: 'producto' | 'paquete',
        field: keyof ProductFormData['dimensionesProducto'] | keyof ProductFormData['dimensionesPaquete'],
        value: any
    ) => {
        if (group === 'producto') {
            setFormData(prev => ({
                ...prev,
                dimensionesProducto: {
                    ...prev.dimensionesProducto,
                    [field]: value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                dimensionesPaquete: {
                    ...prev.dimensionesPaquete,
                    [field]: value,
                },
            }));
        }
    };

    const handleKitDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            dimensionesPackKit: {
                ...prev.dimensionesPackKit,
                [name]: value,
            },
        }));
    };

    const handleAmazonContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            contenidoAmazon: {
                ...prev.contenidoAmazon,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        data.append('SKU', formData.SKU);
        data.append('ASIN', formData.ASIN);
        data.append('nombreProducto', formData.nombreProducto);
        data.append('tituloAmazon', formData.tituloAmazon);
        data.append('marca', formData.marca);
        data.append('categoria', formData.categoria);

        if (formData.imagenPrincipal instanceof File) {
            data.append('imagenPrincipal', formData.imagenPrincipal);
        } else if (formData.imagenPrincipal) {
            data.append('imagenPrincipal', formData.imagenPrincipal);
        }

        if (Array.isArray(formData.imagenes)) {
            formData.imagenes.forEach((img: any) => {
                if (img instanceof File) {
                    data.append('imagenes', img);
                } else {
                    data.append('imagenes', img);
                }
            });
        }

        if (formData.dimensionesProducto) {
            Object.keys(formData.dimensionesProducto).forEach(key => {
                data.append(`dimensionesProducto[${key}]`, formData.dimensionesProducto[key]);
            });
        }
        if (formData.dimensionesPaquete) {
            Object.keys(formData.dimensionesPaquete).forEach(key => {
                data.append(`dimensionesPaquete[${key}]`, formData.dimensionesPaquete[key]);
            });
        }
        if (formData.dimensionesPackKit) {
            Object.keys(formData.dimensionesPackKit).forEach(key => {
                data.append(`dimensionesPackKit[${key}]`, formData.dimensionesPackKit[key]);
            });
        }
        if (formData.contenidoAmazon) {
            Object.keys(formData.contenidoAmazon).forEach(key => {
                data.append(`contenidoAmazon[${key}]`, formData.contenidoAmazon[key]);
            });
        }

        onSubmit(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Información del Producto
            </Typography>

            {/* Información básica del producto (deshabilitamos SKU y ASIN si se está editando) */}
            <ProductMainInfo formData={formData} onChange={handleMainInfoChange} isEditing={!!initialData} />

            {/* Sección de imágenes */}
            <Box sx={{ mt: 4 }}>
                <ProductImagesInput
                    imagenPrincipal={formData.imagenPrincipal}
                    imagenes={formData.imagenes}
                    onChange={handleImagesChange}
                />
            </Box>

            {/* Dimensiones del producto y paquete */}
            <Box sx={{ mt: 4 }}>
                <ProductDimensionsForm
                    dimensionesProducto={formData.dimensionesProducto}
                    dimensionesPaquete={formData.dimensionesPaquete}
                    onChangeDimensions={handleDimensionsChange}
                />
            </Box>

            {/* Dimensiones del kit/pack */}
            <ProductDimensionsKit
                dimensionsKit={formData.dimensionesPackKit as DimensionsKit}
                onChange={handleKitDimensionsChange}
            />

            {/* Contenido para Amazon */}
            <ProductAmazonContent
                amazonContent={formData.contenidoAmazon}
                onChange={handleAmazonContentChange}
            />

            <Button type="submit" variant="contained" sx={{ mt: 4 }}>
                Guardar Producto
            </Button>
        </Box>
    );
};

export default ProductForm;
