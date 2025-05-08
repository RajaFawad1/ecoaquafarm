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

export interface Pegatina {
    id: number;
    nombre: string;
    url: string;
}

interface PegatinasCardProps {
    pegatinas: Pegatina[];
    sku: string;
    onUploadSuccess?: () => void;
}

const PegatinasCard: React.FC<PegatinasCardProps> = ({ pegatinas }) => {
    // Se obtiene la URL base desde la variable de entorno
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    return (
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography gutterBottom>
                    Pegatinas
                </Typography>
                {pegatinas.length > 0 ? (
                    <List>
                        {pegatinas.map((peg) => (
                            <ListItem
                                key={peg.id}
                                disableGutters
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Link
                                            href={`${baseURL}${peg.url}`}
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            {peg.nombre}
                                        </Link>
                                    }
                                />
                                <Button
                                    variant="outlined"
                                    component="a"
                                    target="_blank"
                                    startIcon={<DownloadIcon />}
                                    href={`${baseURL}${peg.url}`}
                                    download
                                >
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No hay pegatinas disponibles.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default PegatinasCard;
