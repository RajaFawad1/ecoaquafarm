'use client';

import React from 'react';
import { Typography } from '@mui/material';

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <Typography variant="body1" color="error" gutterBottom>
            {message}
        </Typography>
    );
};

export default ErrorMessage;
