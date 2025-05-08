'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export interface Certificado {
    id: number;
    nombre: string;
    url: string;
}

interface CertificadosCardProps {
    certificados: Certificado[];
    sku: string;
    onUploadSuccess?: () => void;
}

const CertificadosCard: React.FC<CertificadosCardProps> = ({ certificados }) => {
    // Se obtiene la URL base desde la variable de entorno
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    return (
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography gutterBottom>
                    Certificados
                </Typography>
                {certificados.length > 0 ? (
                    <List>
                        {certificados.map((cert) => (
                            <ListItem
                                key={cert.id}
                                disableGutters
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <ListItemText primary={cert.nombre} />
                                <Button
                                    variant="outlined"
                                    component="a"
                                    target="_blank" // Se añade para abrir en nueva ventana
                                    startIcon={<DownloadIcon />}
                                    // Se concatena la URL base con la ruta almacenada
                                    href={`${baseURL}${cert.url}`}
                                    download
                                >
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No hay certificados disponibles.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default CertificadosCard;
