'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '@/utils/apiClient';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import ErrorMessage from '@/components/ErrorMessage';
import Link from 'next/link';
import ImportationSummary from '@/components/importations/ImportationSummary';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface Importation {
    id: number;
    uuid: string;
    date: string;
    invoices: any;
    transportExpenses: any;
    taxExpenses: any;
    summary: any; // Idealmente, de tipo SummaryData
}

// Función auxiliar para capturar un elemento y devolver su canvas
const captureElement = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
    return await html2canvas(element, { scale: 2 });
};

const ImportationDetailsPage: React.FC = () => {
    const [importation, setImportation] = useState<Importation | null>(null);
    const [loading, setLoading] = useState(true);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Referencia al contenedor del contenido a convertir a PDF
    const contentRef = useRef<HTMLDivElement>(null);

    // Extraemos el parámetro 'id' de la URL
    const params = useParams();
    const { id } = params as { id: string };

    const fetchImportation = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get(`/importations/${id}`);
            setImportation(response.data);
        } catch (error: any) {
            console.error('Error al obtener el detalle de la importación:', error);
            setError('No se pudo cargar los detalles de la importación.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchImportation();
        }
    }, [id]);

    // Función para generar PDF evitando cortar elementos.
    // Se asume que cada factura está envuelta en un contenedor con clase "invoice-container"
    const downloadPDF = async () => {
        if (!contentRef.current) return;
        setPdfLoading(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const margin = 10; // márgenes de 10mm en cada lado
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const pdfWidth = pageWidth - 2 * margin;
            const availableHeight = pageHeight - 2 * margin;

            // Obtenemos todos los contenedores de factura
            const invoiceElements = contentRef.current.querySelectorAll('.invoice-container');

            // Calculamos el factor de conversión de píxeles a mm basado en el ancho del contenedor
            const containerWidthPx = contentRef.current.offsetWidth;
            const scaleFactor = pdfWidth / containerWidthPx;

            let currentY = margin;

            // Iteramos por cada factura
            for (let i = 0; i < invoiceElements.length; i++) {
                const element = invoiceElements[i] as HTMLElement;
                const canvas = await captureElement(element);
                const imgData = canvas.toDataURL('image/png');
                const elementHeightPx = element.offsetHeight;
                const elementHeightMm = elementHeightPx * scaleFactor;

                // Si el elemento no cabe en la página actual, se agrega una nueva página
                if (currentY + elementHeightMm > pageHeight - margin) {
                    pdf.addPage();
                    currentY = margin;
                }

                pdf.addImage(imgData, 'PNG', margin, currentY, pdfWidth, elementHeightMm);
                currentY += elementHeightMm;
            }

            pdf.save(`importacion-${importation?.uuid || id}.pdf`);
        } catch (err) {
            console.error('Error generando PDF:', err);
        } finally {
            setPdfLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 4, position: 'relative' }}>
            {/* Overlay de carga para PDF */}
            {pdfLoading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 1300,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        ⏳ Cargando...
                    </Typography>
                    {/* Aquí puedes agregar animaciones adicionales o un spinner */}
                </Box>
            )}

            <Box mt={2} sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={downloadPDF}>
                    Descargar PDF
                </Button>
                <Link href="/importations" passHref legacyBehavior>
                    <Button variant="outlined">
                        Volver a Importaciones
                    </Button>
                </Link>
            </Box>

            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                Detalles de la Importación
            </Typography>
            {error && <ErrorMessage message={error} />}
            {loading ? (
                <CircularProgress />
            ) : importation ? (
                <Box ref={contentRef}>
                    <Typography variant="h6">
                        UUID: {importation.uuid}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Fecha: {new Date(importation.date).toLocaleString('es-ES')}
                    </Typography>
                    {/* Importante: Cada factura se debe envolver en un contenedor con la clase "invoice-container" */}
                    <Box className="invoice-container">
                        {/* Visualizamos el resumen de la importación */}
                        {importation.summary && (
                            <ImportationSummary summary={importation.summary} />
                        )}
                    </Box>
                    {/* Si tienes más secciones, asegúrate de envolver cada sección que no quieras partir en páginas con "invoice-container" */}
                </Box>
            ) : (
                <Typography>No se encontró la importación.</Typography>
            )}
        </Box>
    );
};

export default ImportationDetailsPage;
