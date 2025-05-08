'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
    CircularProgress,
    Alert,
    Divider
} from '@mui/material';
import apiClient from '@/utils/apiClient';

const FTPPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loadingFiles, setLoadingFiles] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Base URL definida en la variable de entorno (NEXT_PUBLIC_API_BASE_URL)
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Manejar selección de archivo
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Función para subir archivo con datos adicionales utilizando apiClient
    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Por favor, selecciona un archivo.');
            return;
        }
        setError('');
        setMessage('');
        setUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        if (fileName) formData.append('fileName', fileName);
        if (category) formData.append('category', category);

        try {
            const res = await apiClient.post('/upload', formData);
            if (res.status === 200) {
                setMessage('Archivo subido correctamente.');
                // Limpiar campos y recargar lista
                setSelectedFile(null);
                setFileName('');
                setCategory('');
                fetchFiles();
            }
        } catch (err) {
            console.error('Error al subir archivo:', err);
            setError(err.response?.data?.message || 'Error al subir el archivo.');
        } finally {
            setUploading(false);
        }
    };

    // Función para obtener la lista de archivos utilizando apiClient
    const fetchFiles = async () => {
        setLoadingFiles(true);
        try {
            const res = await apiClient.get('/upload/list');
            setFiles(res.data);
        } catch (err) {
            console.error('Error al obtener archivos:', err);
            setError(err.response?.data?.message || 'Error al obtener archivos.');
        } finally {
            setLoadingFiles(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // Agrupar archivos por categoría
    const groupedFiles = files.reduce((acc, file) => {
        const cat = file.category || 'Sin categoría';
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(file);
        return acc;
    }, {});

    // Ordenar las categorías alfabéticamente
    const sortedCategories = Object.keys(groupedFiles).sort((a, b) => a.localeCompare(b));

    return (
        <Box sx={{
            p: 4,
            width: '90vw',
            minHeight: '90vh',
            mx: 'auto',
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 3
        }}>
            <Typography variant="h4" gutterBottom align="center">
                Modo FTP - Gestión de Archivos
            </Typography>

            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                mb: 4
            }}>
                <input type="file" onChange={handleFileChange} />
                <TextField
                    label="Nombre de archivo (opcional)"
                    variant="outlined"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    fullWidth
                    sx={{ maxWidth: 400 }}
                />
                <TextField
                    label="Categoría"
                    variant="outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    sx={{ maxWidth: 400 }}
                />
                <Button variant="contained" onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Subiendo...' : 'Subir Archivo'}
                </Button>
            </Box>

            <Typography variant="h5" gutterBottom>
                Archivos Disponibles
            </Typography>
            {loadingFiles ? (
                <CircularProgress />
            ) : (
                sortedCategories.map((cat) => (
                    <Box key={cat} sx={{ mb: 4 }}>
                        {/* Encabezado de categoría con la primera letra en 3em */}
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            <span style={{ fontSize: '3em', marginRight: '0.2em' }}>
                                {cat.charAt(0)}
                            </span>
                            {cat.slice(1)}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            {groupedFiles[cat].map((file, index) => {
                                // Se construye la URL completa para la descarga
                                const fileUrl = `${baseUrl}${file.url}`;
                                return (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            border: '1px solid #ddd',
                                            borderRadius: 1,
                                            mb: 1,
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            href={fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                border: '1px solid #ddd',
                                                borderRadius: 1,
                                                mb: 1,
                                                justifyContent: 'space-between',
                                                m: 2
                                            }}
                                        >
                                            Descargar
                                        </Button>  <ListItemText
                                            primary={file.name}
                                            secondary={
                                                <>
                                                    <span>URL: {fileUrl}</span>
                                                </>
                                            }
                                        />

                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default FTPPage;
