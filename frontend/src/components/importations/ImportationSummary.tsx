'use client';

import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import GraficoProducto from './GraficoProducto';
import { SummaryData } from '@/helpers/importationHelpers';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ImportationSummaryProps {
    summary: SummaryData | string;
}

const ImportationSummary: React.FC<ImportationSummaryProps> = ({ summary }) => {
    // Si summary es string, lo parseamos a objeto
    const parsedSummary: SummaryData =
        typeof summary === 'string' ? JSON.parse(summary) : summary;

    // Opciones para el gráfico Doughnut anidado
    const nestedOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const dsIndex = context.datasetIndex;
                        const idx = context.dataIndex;
                        const raw = context.parsed || 0;
                        const label = context.chart.data.labels[idx];
                        // Para el anillo de productos, mostramos el sobrecoste asignado
                        if (dsIndex === 0 && idx < context.chart.data.overcosts.length) {
                            const overcost = context.chart.data.overcosts[idx];
                            return `${label}: ${raw.toFixed(2)}% (sobrecoste: ${overcost.toFixed(2)}€)`;
                        }
                        return `${label}: ${raw.toFixed(2)}% del total de la factura`;
                    },
                },
            },
        },
    };

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Sección explicativa */}
            <Paper
                sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: '#f5f5f5',
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Explicación de los Datos
                </Typography>
                <Typography variant="body2">
                    <strong>Subtotal Mercancía:</strong> Suma total de los costos de los productos, ya ajustados con el sobrecoste.
                </Typography>
                <Typography variant="body2">
                    <strong>Gastos de Transporte:</strong> Total de los gastos de transporte asociados a la importación.
                </Typography>
                <Typography variant="body2">
                    <strong>Impuestos:</strong> Suma de todos los impuestos aplicados (IVA, aranceles, etc.).
                </Typography>
                <Typography variant="body2">
                    <strong>Total General:</strong> Suma de Subtotal Mercancía, Gastos de Transporte e Impuestos.
                </Typography>
                <Typography variant="body2">
                    <strong>Importe Base Productos:</strong> Valor total de los productos sin incluir el sobrecoste.
                </Typography>
                <Typography variant="body2">
                    <strong>Sobrecoste Total:</strong> Diferencia entre el importe total de la factura y el importe base de productos, distribuida proporcionalmente entre ellos.
                </Typography>
                <Typography variant="body2">
                    <strong>Costos Adicionales:</strong> Gastos de transporte e impuestos asignados a cada factura.
                </Typography>
                <Divider sx={{ mt: 2 }} />
            </Paper>

            {/* Resumen General */}
            <Paper
                sx={{
                    p: 2,
                    mb: 2,
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Resumen de Importación
                </Typography>
                <Typography variant="body1">
                    <strong>Subtotal Mercancía:</strong> {parsedSummary.totalMercancia.toFixed(2)} €
                </Typography>
                <Typography variant="body1">
                    <strong>Gastos de Transporte:</strong> {parsedSummary.totalTransport.toFixed(2)} €
                </Typography>
                <Typography variant="body1">
                    <strong>Impuestos:</strong> {parsedSummary.totalImpuestos.toFixed(2)} €
                </Typography>
                <Typography variant="body1">
                    <strong>Total General:</strong> {parsedSummary.totalGeneral.toFixed(2)} €
                </Typography>
            </Paper>

            {/* Visualizaciones para cada factura */}
            {parsedSummary.distribution &&
                parsedSummary.distribution.map((dist: any, i: number) => {
                    // Calcular % de cada producto en la factura
                    const sumProd =
                        dist.products.reduce((acc: number, p: any) => acc + p.finalProductCost, 0) || 1;
                    const productLabels = dist.products.map((p: any) => p.producto);
                    const productData = dist.products.map((p: any) => (p.finalProductCost / sumProd) * 100);
                    // Arreglo paralelo de sobrecostes por producto para usarlos en el tooltip
                    const productOvercosts = dist.products.map((p: any) => p.productOvercost || 0);

                    // Calcular distribución del coste (Mercancía, Transporte, Impuestos)
                    const assignedTransport = dist.invoiceProportion * parsedSummary.totalTransport;
                    const assignedTaxes = dist.invoiceProportion * parsedSummary.totalImpuestos;
                    const costSum = dist.finalInvoiceAmount; // baseTotal + gastos asignados
                    const mercPct = (dist.baseTotal / costSum) * 100;
                    const transpPct = (assignedTransport / costSum) * 100;
                    const taxPct = (assignedTaxes / costSum) * 100;

                    const costLabels = ['Mercancía', 'Transporte', 'Impuestos'];
                    const costData = [mercPct, transpPct, taxPct];

                    // Combinamos labels y datos para ambos anillos
                    const allLabels = [...productLabels, ...costLabels];
                    const productDataFull = [...productData, ...costLabels.map(() => 0)];
                    const costDataFull = [...productLabels.map(() => 0), ...costData];

                    // Generar colores para cada segmento: colores aleatorios para productos y fijos para costes
                    const backgroundColors = allLabels.map((_, idx) => {
                        if (idx < productLabels.length) {
                            const random = Math.floor(Math.random() * 16777215).toString(16);
                            return '#' + random;
                        } else {
                            const i2 = idx - productLabels.length;
                            const costColors = ['#66BB6A', '#29B6F6', '#EF5350'];
                            return costColors[i2];
                        }
                    });

                    // Incluir el arreglo de sobrecostes en la data del gráfico
                    const nestedData = {
                        labels: allLabels,
                        datasets: [
                            {
                                label: 'Productos',
                                data: productDataFull,
                                backgroundColor: backgroundColors,
                                weight: 1, // anillo exterior
                            },
                            {
                                label: 'Cost Breakdown',
                                data: costDataFull,
                                backgroundColor: backgroundColors,
                                weight: 0.6, // anillo interior
                            },
                        ],
                        overcosts: productOvercosts, // Información adicional para tooltips
                    };

                    // Calcular el sobrecoste total de la factura y el importe base de productos
                    const overcostTotal = dist.products.reduce((acc: number, p: any) => acc + (p.productOvercost || 0), 0);
                    const baseProductos = dist.baseTotal - overcostTotal;

                    return (
                        <Paper
                            key={i}
                            sx={{
                                p: 2,
                                pageBreakInside: 'avoid',
                                breakInside: 'avoid',
                            }}
                        >
                            <Typography variant="h6">
                                Factura {dist.invoiceRef}
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
                                Importe Base Productos: {baseProductos.toFixed(2)} € <br />
                                Sobrecoste Total: {overcostTotal.toFixed(2)} € <br />
                                Base (con sobrecoste): {dist.baseTotal.toFixed(2)} € <br />
                                Proporción en el total: {(dist.invoiceProportion * 100).toFixed(2)} % <br />
                                Gastos Asignados: {dist.additionalForInvoice.toFixed(2)} € <br />
                                <strong>Total Final: {dist.finalInvoiceAmount.toFixed(2)} €</strong>
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle2" gutterBottom>
                                Doughnut Anidado:
                                <br />
                                - Anillo Exterior: % de cada producto (incluye sobrecoste)
                                <br />
                                - Anillo Interior: % de (Mercancía / Transporte / Impuestos)
                            </Typography>

                            <Box sx={{ width: 400, maxWidth: '100%', mx: 'auto', mb: 3 }}>
                                <Doughnut data={nestedData} options={nestedOptions} />
                            </Box>

                            <Typography variant="subtitle2" gutterBottom>
                                Detalle de Productos
                            </Typography>
                            {dist.products.map((p: any, idx: number) => (
                                <GraficoProducto sx={{
                                    p: 2,
                                    pageBreakInside: 'avoid',
                                    breakInside: 'avoid',
                                }} key={idx} product={p} />
                            ))}
                        </Paper>
                    );
                })}
        </Box>
    );
};

export default ImportationSummary;
