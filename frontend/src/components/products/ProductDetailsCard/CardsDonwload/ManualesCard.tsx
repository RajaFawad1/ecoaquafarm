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

export interface Manual {
    id: number;
    nombre: string;
    url: string;
}

interface ManualesCardProps {
    manuales: Manual[];
    sku: string;
    onUploadSuccess?: () => void;
}

const ManualesCard: React.FC<ManualesCardProps> = ({ manuales }) => {
    // Se obtiene la URL base desde la variable de entorno
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    return (
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography gutterBottom>
                    Manuales
                </Typography>
                {manuales.length > 0 ? (
                    <List>
                        {manuales.map((manual) => (
                            <ListItem
                                key={manual.id}
                                disableGutters
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <ListItemText
                                    primary={
                                        <Link
                                            href={`${baseURL}${manual.url}`}
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            {manual.nombre}
                                        </Link>
                                    }
                                />
                                <Button
                                    variant="outlined"
                                    target="_blank" // Se añade para abrir en nueva ventana
                                    startIcon={<DownloadIcon />}
                                    href={`${baseURL}${manual.url}`}
                                    download
                                >

                                </Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No hay manuales disponibles.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ManualesCard;
