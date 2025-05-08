'use client';

import React from 'react';
import { Card, CardContent, Box, Grid, Typography } from '@mui/material';
import ProductBasicInfo from './ProductBasicInfo';
import ProductImageSection from './ProductImageSection';
import ProductDimensions from './ProductDimensions';
import PackageDimensions from './PackageDimensions';
import CertificadosCard from './CardsDonwload/CertificadosCard';
import PegatinasCard from './CardsDonwload/PegatinasCard';
import ManualesCard from './CardsDonwload/ManualesCard';
import DeclaracionConformidadCard from './CardsDonwload/DeclaracionConformidadCard';
import OthersCard from './CardsDonwload/OthersCard';
import DimensionesPackKit from './DimensionesPackKit';
import FileUploadSelectCard from './CardsDonwload/FileUploadSelectCard';

interface Product {
    SKU: string;
    ASIN: string;
    nombreProducto: string;
    tituloAmazon: string;
    marca: string;
    categoria: string;
    imagenPrincipal?: string;
    imagenes?: string | string[];
    dimensionesProducto?: {
        longitudProducto?: number;
        anchoProducto?: number;
        alturaProducto?: number;
        pesoNeto?: number;
    };
    dimensionesPaquete?: {
        longitudPaquete?: number;
        anchoPaquete?: number;
        alturaPaquete?: number;
        pesoBruto?: number;
        tipoEmbalaje?: string;
        cantidadPiezas?: number;
        unidadMedida?: string;
    };
    archivosSKU?: any[];
    certificados?: any[];
    pegatinas?: any[];
    manuales?: any[];
    declaraciones?: any[];
    otros?: any[];
    createdAt?: string;
    dimensionesPackKit?: {
        longitud?: number;
        ancho?: number;
        altura?: number;
        peso?: number;
    };
    importations?: any; // Nueva propiedad con la información de importaciones relacionadas
}

interface ProductDetailCardProps {
    product: Product;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
    // Filtrar archivos según su tipo
    const archivos = product.archivosSKU || [];
    const certificados = archivos.filter(file => file.type === "certificado");
    const pegatinas = archivos.filter(file => file.type === "pegatina");
    const manuales = archivos.filter(file => file.type === "manual");
    const declaraciones = archivos.filter(file => file.type === "declaracion" || file.type === "declaracionConformidad");
    const otros = archivos.filter(file =>
        file.type !== "certificado" &&
        file.type !== "pegatina" &&
        file.type !== "manual" &&
        file.type !== "declaracion" &&
        file.type !== "declaracionConformidad"
    );

    return (
        <Card variant="outlined" sx={{ padding: 2 }}>
            <CardContent>
                {/* Página 1: Información básica, tarjetas y sección de imágenes */}
                <Box id="pdf-page1">
                    <ProductBasicInfo
                        nombreProducto={product.nombreProducto}
                        SKU={product.SKU}
                        ASIN={product.ASIN}
                        tituloAmazon={product.tituloAmazon}
                        marca={product.marca}
                        categoria={product.categoria}
                        createdAt={product.createdAt}
                        importations={product.importations} // Nueva propiedad con la información de importaciones relacionadas
                    /> {/* Página 4: Información de Importaciones Relacionadas */}

                    <Grid container spacing={3}>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' },
                                gap: 3,
                                mt: 4,
                                fontSize: '0.9rem',
                                overflow: 'auto',
                            }}
                            className="no-pdf"
                        >
                            <CertificadosCard certificados={certificados} sku={product.SKU} />
                            <PegatinasCard pegatinas={pegatinas} sku={product.SKU} />
                            <ManualesCard manuales={manuales} sku={product.SKU} />
                            <DeclaracionConformidadCard declaraciones={declaraciones} sku={product.SKU} />
                            <OthersCard otros={otros} sku={product.SKU} />
                            <Box sx={{ flex: 2 }} className="no-pdf">
                                <FileUploadSelectCard sku={product.SKU} />
                            </Box>
                        </Box>
                    </Grid>
                    <ProductImageSection
                        imagenPrincipal={product.imagenPrincipal}
                        imagenes={product.imagenes}
                        baseURL={baseURL}
                    />
                </Box>
                {/* Página 2: Dimensiones y otros detalles */}
                <Box id="pdf-page2" sx={{ mt: 4 }}>
                    {product.dimensionesProducto && (
                        <ProductDimensions dimensionesProducto={product.dimensionesProducto} />
                    )}
                    {product.dimensionesPaquete && (
                        <PackageDimensions dimensionesPaquete={product.dimensionesPaquete} />
                    )}
                    {product.dimensionesPackKit && (
                        <DimensionesPackKit dimensionesPackKit={product.dimensionesPackKit} />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductDetailCard;
