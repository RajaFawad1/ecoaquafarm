'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Button,
    Box,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export interface TransportExpense {
    name: string;
    value: number;
    description: string;
    fixed?: boolean;
}

interface TransportExpensesTableProps {
    expenses: TransportExpense[];
    onExpensesChange: (expenses: TransportExpense[]) => void;
}

const TransportExpensesTable: React.FC<TransportExpensesTableProps> = ({ expenses, onExpensesChange }) => {
    const handleExpenseChange = (
        index: number,
        field: keyof TransportExpense,
        value: any
    ) => {
        const updatedExpenses = expenses.map((expense, i) =>
            i === index ? { ...expense, [field]: field === 'value' ? (value === '' ? 0 : parseFloat(value)) : value } : expense
        );
        onExpensesChange(updatedExpenses);
    };

    const handleDeleteExpense = (index: number) => {
        if (expenses[index].fixed) return;
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        onExpensesChange(updatedExpenses);
    };

    const handleAddExpense = () => {
        onExpensesChange([...expenses, { name: '', value: 0.0, description: '', fixed: false }]);
    };

    return (
        <Box sx={{ padding: 1, marginTop: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                🚚 Gastos de Transporte
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ py: 0.5, px: 1 }}>Gasto</TableCell>
                            <TableCell sx={{ py: 0.5, px: 1 }}>Valor (€)</TableCell>
                            <TableCell sx={{ py: 0.5, px: 1, width: '50px' }}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense, index) => (
                            <React.Fragment key={index}>
                                <TableRow>
                                    <TableCell sx={{ py: 0.3, px: 1 }}>
                                        <TextField
                                            size="small"
                                            value={expense.name}
                                            onChange={(e) => handleExpenseChange(index, 'name', e.target.value)}
                                            placeholder="Tipo"
                                            fullWidth
                                            disabled={expense.fixed}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ py: 0.3, px: 1 }}>
                                        <TextField
                                            size="small"
                                            type="number"
                                            inputProps={{ step: '0.01' }}
                                            value={expense.value}
                                            onChange={(e) => handleExpenseChange(index, 'value', e.target.value)}
                                            placeholder="0.00"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell sx={{ py: 0.3, px: 1 }}>
                                        {!expense.fixed && (
                                            <IconButton size="small" onClick={() => handleDeleteExpense(index)} color="error">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3} sx={{ py: 0.2, px: 1 }}>
                                        <TextField
                                            size="small"
                                            value={expense.description}
                                            onChange={(e) => handleExpenseChange(index, 'description', e.target.value)}
                                            placeholder="Descripción del gasto"
                                            fullWidth
                                            multiline
                                            rows={1}
                                        />
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={1}>
                <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={handleAddExpense}>
                    Añadir Gasto
                </Button>
            </Box>
        </Box>
    );
};

export default TransportExpensesTable;

