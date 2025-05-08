'use client';

import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface TaxExpense {
    name: string;
    value: number;
    description?: string;
    fixed?: boolean; // si es true, no se elimina
}

interface TaxExpensesTableProps {
    taxes: TaxExpense[];
    onTaxesChange: (taxes: TaxExpense[]) => void;
}

const TaxExpensesTable: React.FC<TaxExpensesTableProps> = ({ taxes, onTaxesChange }) => {
    // Manejo de cambios en la tabla
    const handleTaxChange = (index: number, field: keyof TaxExpense, value: any) => {
        const updatedTaxes = taxes.map((tax, i) => {
            if (i === index) {
                return {
                    ...tax,
                    [field]: field === 'value' ? (value === '' ? 0 : parseFloat(value)) : value,
                };
            }
            return tax;
        });
        onTaxesChange(updatedTaxes);
    };

    const handleAddTax = () => {
        // Agrega un nuevo impuesto con valores por defecto
        onTaxesChange([
            ...taxes,
            {
                name: '',
                value: 0.0,
                description: '',
                fixed: false,
            },
        ]);
    };

    const handleDeleteTax = (index: number) => {
        // Elimina si no es un impuesto fijo
        if (taxes[index].fixed) return;
        const updatedTaxes = taxes.filter((_, i) => i !== index);
        onTaxesChange(updatedTaxes);
    };

    return (
        <Box sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
                Impuestos
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Impuesto</TableCell>
                            <TableCell>Valor (€)</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taxes.map((tax, index) => (
                            <React.Fragment key={index}>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={tax.name}
                                            onChange={(e) => handleTaxChange(index, 'name', e.target.value)}
                                            placeholder="Nombre del impuesto"
                                            disabled={tax.fixed}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="number"
                                            inputProps={{ step: '0.01' }}
                                            value={tax.value}
                                            onChange={(e) => handleTaxChange(index, 'value', e.target.value)}
                                            placeholder="0.00"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {!tax.fixed && (
                                            <IconButton size="small" onClick={() => handleDeleteTax(index)} color="error">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                                {/* Fila para descripción (opcional) */}
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            multiline
                                            rows={1}
                                            value={tax.description}
                                            onChange={(e) => handleTaxChange(index, 'description', e.target.value)}
                                            placeholder="Descripción"
                                        />
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={1}>
                <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={handleAddTax}>
                    Añadir Impuesto
                </Button>
            </Box>
        </Box>
    );
};

export default TaxExpensesTable;
