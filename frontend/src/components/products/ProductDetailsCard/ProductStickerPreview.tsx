import React, { useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';

const ProductStickerPreview = ({
    nombreProducto,
    SKU,
    ASIN,
    marca,
}) => {
    const barcodeTopRef = useRef(null);
    const barcodeBottomRef = useRef(null);

    // Genera los códigos de barras en los canvas
    useEffect(() => {
        if (barcodeTopRef.current) {
            JsBarcode(barcodeTopRef.current, SKU, {
                format: 'CODE128',
                displayValue: true,
                fontSize: 12,
                margin: 10,
            });
        }
        if (barcodeBottomRef.current) {
            JsBarcode(barcodeBottomRef.current, ASIN, {
                format: 'CODE128',
                displayValue: true,
                fontSize: 12,
                margin: 10,
            });
        }
    }, [SKU, ASIN]);

    const handleDownloadPDF = () => {
        // Configuración para 62mm de ancho (aprox. 175pt) y altura ajustable (250pt en este ejemplo)
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [175, 250],
        });

        // Extrae las imágenes de los canvas (códigos de barras)
        const barcodeTopDataURL = barcodeTopRef.current.toDataURL('image/png');
        const barcodeBottomDataURL = barcodeBottomRef.current.toDataURL('image/png');

        const margin = 10;
        let currentY = margin;
        const barcodeWidth = 175 - margin * 2;
        const barcodeHeight = 50;

        // Código de barras superior (SKU)
        doc.addImage(barcodeTopDataURL, 'PNG', margin, currentY, barcodeWidth, barcodeHeight);
        currentY += barcodeHeight + 10;

        // Datos del producto (se envuelve el texto si es necesario)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        const nombreLines = doc.splitTextToSize(nombreProducto, barcodeWidth);
        doc.text(nombreLines, margin, currentY);
        currentY += nombreLines.length * 15;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`SKU: ${SKU}`, margin, currentY);
        currentY += 15;
        doc.text(`ASIN: ${ASIN}`, margin, currentY);
        currentY += 15;
        doc.text(`Marca: ${marca}`, margin, currentY);
        currentY += 15;


        // Código de barras inferior (ASIN)
        doc.addImage(barcodeBottomDataURL, 'PNG', margin, currentY, barcodeWidth, barcodeHeight);

        // Descarga el PDF
        doc.save('sticker.pdf');
    };

    return (
        <div>
            {/* Previsualización del sticker */}
            <div
                style={{
                    width: '100%',
                    border: '1px solid #ccc',
                    padding: '10pt',
                    marginBottom: '20pt',
                    fontFamily: 'Arial, sans-serif',
                    wordBreak: 'break-word',
                }}
            >{/* Botón para descargar el PDF */}
                <button className="no-pdf" onClick={handleDownloadPDF}>Descargar Pegatinas PDF</button>
                {/* Código de barras superior: SKU */}
                <div style={{ textAlign: 'center' }}>
                    <canvas ref={barcodeTopRef} />
                </div>
                {/* Datos del producto sin Amazon y sin formattedDate */}
                <div style={{ marginTop: '10pt', textAlign: 'center', wordBreak: 'break-word' }}>
                    <h4 style={{ margin: 0, fontWeight: 'bold', color: '#333', fontSize: '12pt' }}>
                        {nombreProducto}
                    </h4>
                    <p style={{ margin: '5pt 0', color: '#555', fontSize: '10pt' }}>
                        <strong>SKU:</strong> {SKU}
                        {" - "}
                        <strong>ASIN:</strong> {ASIN}
                    </p>
                    <p style={{ margin: '5pt 0', color: '#555', fontSize: '10pt' }}>
                        <strong>Marca:</strong> {marca}
                    </p>

                </div>
                {/* Código de barras inferior: ASIN */}
                <div style={{ textAlign: 'center', marginTop: '10pt' }}>
                    <canvas ref={barcodeBottomRef} />
                </div>
            </div>

        </div>
    );
};
export default ProductStickerPreview;
