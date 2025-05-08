'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import apiClient from '@/utils/apiClient';

interface FileUploadSelectCardProps {
    sku: string;
    onUploadSuccess?: () => void;
}

const FileUploadSelectCard: React.FC<FileUploadSelectCardProps> = ({ sku, onUploadSuccess }) => {
    const [fileType, setFileType] = useState('');
    const [nombre, setNombre] = useState('');
    const [archivo, setArchivo] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileTypeChange = (event: SelectChangeEvent<string>) => {
        setFileType(event.target.value as string);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setArchivo(e.target.files[0]);
        }
    };

    const handleDeleteFile = () => {
        setArchivo(null);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!archivo || !nombre || !fileType) return;
        const formData = new FormData();
        formData.append('type', fileType);
        formData.append('sku', sku);
        formData.append('nombre', nombre);
        formData.append('archivo', archivo);

        try {
            setUploading(true);
            const response = await apiClient.post('/products/file/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Respuesta de subida:', response.data);
            setFileType('');
            setNombre('');
            setArchivo(null);
            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            console.error('Error al subir archivo:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography gutterBottom>
                    Subir Archivo Adicional
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleUpload}
                    sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="file-type-label">Tipo de Archivo</InputLabel>
                        <Select
                            labelId="file-type-label"
                            value={fileType}
                            label="Tipo de Archivo"
                            onChange={handleFileTypeChange}
                        >
                            <MenuItem value="certificado">Certificado</MenuItem>
                            <MenuItem value="pegatina">Pegatina</MenuItem>
                            <MenuItem value="manual">Manual</MenuItem>
                            <MenuItem value="declaracion">Declaración de Conformidad</MenuItem>
                            <MenuItem value="otro">Otro</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" component="label" fullWidth>
                        Seleccionar Archivo
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {/* Si ya se ha seleccionado un archivo, mostramos sus detalles */}
                    {archivo && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                p: 1,
                            }}
                        >
                            <Typography variant="body2">
                                {archivo.name} ({(archivo.size / 1024).toFixed(2)} KB)
                            </Typography>
                            <Button variant="text" color="error" onClick={handleDeleteFile}>
                                Eliminar
                            </Button>
                        </Box>
                    )}
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={uploading}>
                        {uploading ? 'Subiendo...' : 'Subir Archivo'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FileUploadSelectCard;
