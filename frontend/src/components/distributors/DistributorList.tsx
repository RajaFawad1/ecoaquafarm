'use client';

import React from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import ErrorMessage from '@/components/ErrorMessage';

interface Distributor {
    id: number;
    name: string;
    country: string;
    contactPerson: string;
    city: string;
    locality?: string;
    phone?: string;
    email?: string;
}

interface DistributorListProps {
    distributors: Distributor[];
    loading: boolean;
}

const DistributorList: React.FC<DistributorListProps> = ({ distributors, loading }) => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Listado de Distribuidores
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {distributors.map((distributor) => (
                        <ListItem key={distributor.id} divider>
                            <ListItemText
                                primary={distributor.name}
                                secondary={`Contacto: ${distributor.contactPerson} - ${distributor.city}, ${distributor.country}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default DistributorList;
