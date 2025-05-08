'use client';

import React from 'react';
import {
    Grid,
    TextField,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClientForm = ({ clientData, setClientData }: any) => {
    return (
        <Accordion sx={{ marginTop: 4, border: '1px solid #ddd', borderRadius: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="client-form-content"
                id="client-form-header"
                sx={{
                    bgcolor: '#f5f5f5',
                    padding: 2,
                    borderBottom: '1px solid #ddd',
                    borderRadius: '4px 4px 0 0',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    👤 Datos del Cliente
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    {Object.keys(clientData).map((key) => (
                        <Grid item xs={12} sm={6} key={key}>
                            <TextField
                                label={key
                                    .replace(/([A-Z])/g, ' $1') // Separar camelCase en palabras
                                    .replace(/^./, (str) => str.toUpperCase())} // Capitalizar la primera letra
                                placeholder={`Ingrese ${key.toLowerCase()}`} // Añadir un placeholder descriptivo
                                fullWidth
                                variant="outlined"
                                value={clientData[key]}
                                onChange={(e) =>
                                    setClientData({ ...clientData, [key]: e.target.value })
                                }
                                InputLabelProps={{
                                    shrink: true, // Mantener el label visible cuando se ingresa texto
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ marginTop: 3 }}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ textAlign: 'center', fontStyle: 'italic' }}
                    >
                        * Asegúrese de completar todos los campos requeridos.
                    </Typography>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default ClientForm;
