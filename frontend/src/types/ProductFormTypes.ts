// src/types/ProductFormTypes.ts

export interface DimensionesProducto {
    longitudProducto?: number;
    anchoProducto?: number;
    alturaProducto?: number;
    pesoNeto?: number;
}

export interface DimensionesPaquete {
    longitudPaquete?: number;
    anchoPaquete?: number;
    alturaPaquete?: number;
    pesoBruto?: number;
    tipoEmbalaje?: string;
    cantidadPiezas?: number;
    unidadMedida?: string;
}

export interface DimensionesPackKit {
    packKit: string;           // Identificador autogenerado
    cantidadProductos?: number;
    largo?: number;
    ancho?: number;
    alto?: number;
    pesoBrutoPack?: number;
    precioVentaPack?: number;
    observaciones: string;
    ASIN: string;              // Para asociarlo al producto
}

export interface AmazonContent {
    descripcion: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    bullet5: string;
    bullet6: string;
    bullet7: string;
}

export interface ProductFormData {
    SKU: string;
    ASIN: string;
    nombreProducto: string;
    tituloAmazon: string;
    marca: string;
    categoria: string;
    imagenPrincipal: string | File;
    imagenes: (string | File)[];
    dimensionesProducto: DimensionesProducto;
    dimensionesPaquete: DimensionesPaquete;
    dimensionesPackKit: DimensionesPackKit;
    contenidoAmazon: AmazonContent;
}
