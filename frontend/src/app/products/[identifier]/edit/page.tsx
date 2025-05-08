// app/products/[identifier]/edit/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';
import apiClient from '@/utils/apiClient';
import ErrorMessage from '@/components/ErrorMessage';
import ProductForm, { ProductFormData } from '@/components/products/ProductForm';

const EditProductPage = () => {
    const router = useRouter();
    const { identifier } = useParams(); // Puede ser SKU o ASIN
    const [productData, setProductData] = useState<ProductFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 1. Obtener los datos del producto existente
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/products/${identifier}`);
            const existingProduct = response.data;

            // Formatear los datos para que coincidan con la interfaz ProductFormData
            const formattedData: ProductFormData = {
                SKU: existingProduct.SKU || '',
                ASIN: existingProduct.ASIN || '',
                nombreProducto: existingProduct.nombreProducto || '',
                tituloAmazon: existingProduct.tituloAmazon || '',
                marca: existingProduct.marca || '',
                categoria: existingProduct.categoria || '',
                imagenPrincipal: existingProduct.imagenPrincipal || '',
                imagenes: existingProduct.imagenes || [],
                dimensionesProducto: {
                    longitudProducto: existingProduct?.dimensionesProducto?.longitudProducto,
                    anchoProducto: existingProduct?.dimensionesProducto?.anchoProducto,
                    alturaProducto: existingProduct?.dimensionesProducto?.alturaProducto,
                    pesoNeto: existingProduct?.dimensionesProducto?.pesoNeto,
                },
                dimensionesPaquete: {
                    longitudPaquete: existingProduct?.dimensionesPaquete?.longitudPaquete,
                    anchoPaquete: existingProduct?.dimensionesPaquete?.anchoPaquete,
                    alturaPaquete: existingProduct?.dimensionesPaquete?.alturaPaquete,
                    pesoBruto: existingProduct?.dimensionesPaquete?.pesoBruto,
                    tipoEmbalaje: existingProduct?.dimensionesPaquete?.tipoEmbalaje || '',
                    cantidadPiezas: existingProduct?.dimensionesPaquete?.cantidadPiezas,
                    unidadMedida: existingProduct?.dimensionesPaquete?.unidadMedida || '',
                },
                dimensionesPackKit: {
                    packKit: existingProduct?.dimensionesPackKit?.packKit || '',
                    cantidadProductos: existingProduct?.dimensionesPackKit?.cantidadProductos,
                    largo: existingProduct?.dimensionesPackKit?.largo,
                    ancho: existingProduct?.dimensionesPackKit?.ancho,
                    alto: existingProduct?.dimensionesPackKit?.alto,
                    pesoBrutoPack: existingProduct?.dimensionesPackKit?.pesoBrutoPack,
                    precioVentaPack: existingProduct?.dimensionesPackKit?.precioVentaPack || null,
                    observaciones: existingProduct?.dimensionesPackKit?.observaciones || '',
                    ASIN: existingProduct?.dimensionesPackKit?.ASIN || '',
                },
                contenidoAmazon: {
                    descripcion: existingProduct?.contenidoAmazon?.descripcion || '',
                    bullet1: existingProduct?.contenidoAmazon?.bullet1 || '',
                    bullet2: existingProduct?.contenidoAmazon?.bullet2 || '',
                    bullet3: existingProduct?.contenidoAmazon?.bullet3 || '',
                    bullet4: existingProduct?.contenidoAmazon?.bullet4 || '',
                    bullet5: existingProduct?.contenidoAmazon?.bullet5 || '',
                    bullet6: existingProduct?.contenidoAmazon?.bullet6 || '',
                    bullet7: existingProduct?.contenidoAmazon?.bullet7 || '',
                },
            };

            setProductData(formattedData);
            setError(null);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('No se pudo cargar el producto. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    // 2. Al montar el componente, cargamos los datos del producto
    useEffect(() => {
        if (identifier) {
            fetchProduct();
        }
    }, [identifier]);

    // 3. Función para enviar la actualización del producto
    const handleUpdateProduct = async (data: ProductFormData) => {
        setLoading(true);
        setError(null);
        try {
            // Hacemos PUT con el "identifier" (SKU o ASIN)
            await apiClient.put(`/products/${identifier}`, data);
            alert('Producto actualizado exitosamente.');
            router.push(`/products/${identifier}`); // Redirigir a la página de detalle, por ejemplo
        } catch (error) {
            console.error('Error updating product:', error);
            setError('No se pudo actualizar el producto. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Editar Producto
            </Typography>
            {error && <ErrorMessage message={error} />}
            {loading ? (
                <CircularProgress />
            ) : productData ? (
                <ProductForm onSubmit={handleUpdateProduct} initialData={productData} />
            ) : (
                <Typography>No se encontró el producto.</Typography>
            )}
        </Box>
    );
};

export default EditProductPage;
