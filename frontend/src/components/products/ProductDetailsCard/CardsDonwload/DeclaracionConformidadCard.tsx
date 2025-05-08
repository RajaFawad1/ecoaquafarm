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
    Link,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export interface Declaracion {
    id: number;
    nombre: string;
    url: string;
}

interface DeclaracionConformidadCardProps {
    declaraciones: Declaracion[];
    sku: string;
    onUploadSuccess?: () => void;
}

const DeclaracionConformidadCard: React.FC<DeclaracionConformidadCardProps> = ({ declaraciones }) => {
    // Se obtiene la URL base desde la variable de entorno
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    return (
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography gutterBottom>
                    Declaración de Conformidad
                </Typography>
                {declaraciones.length > 0 ? (
                    <List>
                        {declaraciones.map((decl) => (
                            <ListItem
                                key={decl.id}
                                disableGutters
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <ListItemText
                                    primary={
                                        <Link
                                            href={`${baseURL}${decl.url}`}
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            {decl.nombre}
                                        </Link>
                                    }
                                />
                                <Button
                                    variant="outlined"
                                    component="a"
                                    target="_blank" // Se añade para abrir en nueva ventana
                                    startIcon={<DownloadIcon />}
                                    href={`${baseURL}${decl.url}`}
                                    download
                                >

                                </Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No hay declaraciones disponibles.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default DeclaracionConformidadCard;
