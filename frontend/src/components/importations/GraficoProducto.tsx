'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

// Registramos los elementos en ChartJS
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ProductoProps {
    product: {
        producto: string;
        modelo: string;
        qty: number | string;
        // En este caso, productBase ya incluye el costo base ajustado (costo original + sobrecoste)
        productBase?: number;
        // Sobre costo distribuido a este producto (diferencia entre el importe de la factura y la suma de los importes base de los productos)
        productOvercost?: number;
        // Gastos adicionales asignados (transporte, impuestos, etc.)
        additionalForProduct?: number;
        finalProductCost?: number;
    };
}

const GraficoProducto: React.FC<ProductoProps> = ({ product }) => {
    // Extraemos o inicializamos a 0
    const {
        producto,
        modelo,
        qty = 1,
        productBase = 0,
        productOvercost = 0,
        additionalForProduct = 0,
        finalProductCost = 0,
    } = product;

    // Aseguramos que qty sea número > 0
    const quantity = Number(qty) || 1;

    // Separamos el costo base original (sin sobrecoste)
    // productBase ya está ajustado, por lo que el costo base original es:
    const baseCostTotal = productBase - productOvercost;
    // Costo por unidad de cada componente:
    const basePerUnit = baseCostTotal / quantity;
    const overcostPerUnit = productOvercost / quantity;
    const additionalPerUnit = additionalForProduct / quantity;
    const finalCostPerUnit = finalProductCost / quantity;

    // Porcentajes (sobre el finalCostPerUnit)
    const basePercent = finalCostPerUnit > 0 ? (basePerUnit / finalCostPerUnit) * 100 : 0;
    const overcostPercent = finalCostPerUnit > 0 ? (overcostPerUnit / finalCostPerUnit) * 100 : 0;
    const additionalPercent = finalCostPerUnit > 0 ? (additionalPerUnit / finalCostPerUnit) * 100 : 0;

    // Data para la barra apilada (3 segmentos: Base, Sobrecoste, Adicional)
    const data = {
        labels: ['Coste (100% = 1 unidad)'],
        datasets: [
            {
                label: 'Coste Base Unitario',
                data: [basePercent],
                backgroundColor: 'rgba(0, 128, 0, 0.6)', // Verde
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
            },
            {
                label: 'Sobrecoste Unitario',
                data: [overcostPercent],
                backgroundColor: 'rgba(30, 144, 255, 0.6)', // Azul (DodgerBlue)
                borderColor: 'rgba(30, 144, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Coste Adicional Unitario',
                data: [additionalPercent],
                backgroundColor: 'rgba(255, 0, 0, 0.6)', // Rojo
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Opciones para barra apilada horizontal al 100%
    const options = {
        responsive: true,
        indexAxis: 'y' as const, // Barras horizontales
        scales: {
            x: {
                stacked: true,
                min: 0,
                max: 100,
                ticks: {
                    callback: (value: any) => value + '%',
                },
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <Box sx={{ mb: 3, ml: 2 }}>
            {/* Datos del producto */}
            <Typography variant="body2">
                - <strong>{producto}</strong> (Modelo: {modelo})
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
                Cantidad total: {quantity} <br />
                <u>Costes Totales (todas las unidades)</u>: <br />
                • Base (original): {(baseCostTotal).toFixed(2)} € <br />
                • Sobrecoste: {productOvercost.toFixed(2)} € <br />
                • Adicional: {additionalForProduct.toFixed(2)} € <br />
                • <strong>Final: {finalProductCost.toFixed(2)} €</strong> <br />
                <u>Costes Por Unidad</u>: <br />
                • Base/U: {basePerUnit.toFixed(2)} € <br />
                • Sobrecoste/U: {overcostPerUnit.toFixed(2)} € <br />
                • Adicional/U: {additionalPerUnit.toFixed(2)} € <br />
                • <strong>Final/U: {finalCostPerUnit.toFixed(2)} €</strong>
            </Typography>

            {/* Barra apilada al 100% (Base, Sobrecoste y Adicional) */}
            <Box sx={{ width: 300, maxWidth: '100%', mt: 1 }}>
                <Bar data={data} options={options} />
            </Box>
        </Box>
    );
};

export default GraficoProducto;
