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

export interface OtroItem {
    id: number;
    nombre: string;
    url: string;
}

interface OtrosCardProps {
    otros: OtroItem[];
    sku: string;
    onUploadSuccess?: () => void;
}

const OthersCard: React.FC<OtrosCardProps> = ({ otros }) => {
    // Se obtiene la URL base desde la variable de entorno
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    return (
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography gutterBottom>
                    Otros
                </Typography>
                {otros.length > 0 ? (
                    <List>
                        {otros.map((item) => (
                            <ListItem
                                key={item.id}
                                disableGutters
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <ListItemText
                                    primary={
                                        <Link
                                            href={`${baseURL}${item.url}`}
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            {item.nombre}
                                        </Link>
                                    }
                                />
                                <Button
                                    variant="outlined"
                                    component="a"
                                    target="_blank" // Se añade para abrir en nueva ventana
                                    startIcon={<DownloadIcon />}
                                    href={`${baseURL}${item.url}`}
                                    download
                                >

                                </Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No hay información adicional disponible.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default OthersCard;
