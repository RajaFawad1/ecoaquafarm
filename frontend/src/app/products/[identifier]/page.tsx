'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import apiClient from '@/utils/apiClient';
import ErrorMessage from '@/components/ErrorMessage';
import ProductDetailCard from '@/components/products/ProductDetailsCard/ProductDetailCard';
import ProductAmazonContentDetail from '@/components/products/ProductDetailsCard/ProductAmazonContentDetail';

interface ImportationSummary {
    importationId: number;
    importationDate: string;
    invoices: {
        invoiceRef: string;
        amount: number;
        // Otros campos relevantes
    }[];
}

interface Product {
    SKU: string;
    ASIN: string;
    nombreProducto: string;
    tituloAmazon: string;
    marca: string;
    categoria: string;
    imagenPrincipal?: string;
    imagenes?: string | string[];
    dimensionesProducto?: {
        longitudProducto?: number;
        anchoProducto?: number;
        alturaProducto?: number;
        pesoNeto?: number;
    };
    dimensionesPaquete?: {
        longitudPaquete?: number;
        anchoPaquete?: number;
        alturaPaquete?: number;
        pesoBruto?: number;
        tipoEmbalaje?: string;
        cantidadPiezas?: number;
        unidadMedida?: string;
    };
    archivosSKU?: any[];
    certificados?: any[];
    pegatinas?: any[];
    manuales?: any[];
    declaraciones?: any[];
    otros?: any[];
    createdAt?: string;
    dimensionesPackKit?: {
        longitud?: number;
        ancho?: number;
        altura?: number;
        peso?: number;
    };
    contenidoAmazon?: {
        descripcion: string;
        bullet1: string;
        bullet2: string;
        bullet3: string;
        bullet4: string;
        bullet5: string;
        bullet6: string;
        bullet7: string;
    };
    importations?: ImportationSummary[];
}

const ProductDetailPage = () => {
    const { identifier } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pdfGenerating, setPdfGenerating] = useState(false);

    // Función para obtener el detalle del producto (incluye importations)
    const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get(`/products/${identifier}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('No se pudo cargar el detalle del producto. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (identifier) {
            fetchProduct();
        }
    }, [identifier]);

    // Función para generar el PDF con 3 páginas
    const handleDownloadPDF = async () => {
        const page1El = document.getElementById('pdf-page1');
        const page2El = document.getElementById('pdf-page2');
        const page3El = document.getElementById('pdf-page3');
        if (!page1El || !page2El || !page3El) {
            console.error('No se encontraron todos los elementos necesarios para el PDF');
            return;
        }
        setPdfGenerating(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const margin = 10; // margen de 10mm
            const contentWidth = pdfWidth - 2 * margin;
            const html2canvasOptions = {
                scale: 3,
                useCORS: true,
                allowTaint: false,
                ignoreElements: (element: HTMLElement) =>
                    element.classList.contains('no-pdf'),
            };

            // Función para capturar un elemento y añadirlo a la página actual
            const addPageFromElement = async (element: HTMLElement) => {
                const canvas = await html2canvas(element, html2canvasOptions);
                const imgData = canvas.toDataURL('image/png');
                const pdfImgHeight = (canvas.height * contentWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, pdfImgHeight);
            };

            // Página 1: Detalle del Producto
            await addPageFromElement(page1El);
            // Página 2: Información Adicional (puedes personalizarla)
            pdf.addPage();
            await addPageFromElement(page2El);
            // Página 3: Contenido para Amazon
            pdf.addPage();
            await addPageFromElement(page3El);

            pdf.save(`${product?.nombreProducto || 'detalle_producto'}.pdf`);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        } finally {
            setPdfGenerating(false);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <ErrorMessage message={error} />;
    if (!product) return <Typography variant="h6">Producto no encontrado</Typography>;

    return (
        <Box sx={{ padding: 4, position: 'relative' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadPDF}
                sx={{ mb: 3 }}
            >
                Descargar PDF
            </Button>
            {/* Contenedor general para exportar al PDF */}
            <Box id="pdf-content">
                {/* Página 1: Detalle del Producto */}
                <ProductDetailCard product={product} />



                {/* Página 3: Contenido para Amazon */}
                <Box id="pdf-page3" sx={{ mt: 4 }}>
                    {product.contenidoAmazon && (
                        <ProductAmazonContentDetail
                            descripcion={product.contenidoAmazon.descripcion}
                            bullet1={product.contenidoAmazon.bullet1}
                            bullet2={product.contenidoAmazon.bullet2}
                            bullet3={product.contenidoAmazon.bullet3}
                            bullet4={product.contenidoAmazon.bullet4}
                            bullet5={product.contenidoAmazon.bullet5}
                            bullet6={product.contenidoAmazon.bullet6}
                            bullet7={product.contenidoAmazon.bullet7}
                        />
                    )}
                </Box>

                {/* Si deseas incluir información de importaciones en el PDF, podrías agregar otra sección */}
            </Box>

            {/* Sección que se excluye del PDF */}
            <Box className="no-pdf" sx={{ mt: 4 }}>
                {/* Componentes que no deseas exportar, por ejemplo, botones de acción */}
            </Box>

            {pdfGenerating && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#333',
                        textAlign: 'center',
                        p: 2,
                    }}
                >
                    <CircularProgress size={80} sx={{ mb: 2 }} />
                    <Typography variant="h6">Generando PDF... ⏳</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ProductDetailPage;
