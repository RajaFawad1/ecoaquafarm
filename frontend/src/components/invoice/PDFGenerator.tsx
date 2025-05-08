import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';

const PDFGenerator = ({ invoice }: { invoice: any }) => {
    const handleDownloadPDF = () => {
        const pdf = new jsPDF();

        // Título principal
        const year = new Date(invoice.date).getFullYear();
        const formattedDate = new Date(invoice.date).toLocaleDateString('es-ES');
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.text(`Factura ${year}/${invoice.numberInvoice}`, 105, 15, { align: 'center' });

        // Fecha de la factura
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Fecha: ${formattedDate}`, 105, 25, { align: 'center' });

        // Nombre de la tienda
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(invoice.store.name, 105, 35, { align: 'center' });

        // Información del Cliente y Tienda
        autoTable(pdf, {
            startY: 45,
            head: [['CLIENTE', 'TIENDA']],
            body: [[
                `Nombre: ${invoice.client.nombre}\nDNI/CIF: ${invoice.client.dniCif}\nDirección: ${invoice.client.direccion || 'N/A'}`,
                `Nombre: ${invoice.store.name}\nCIF: ${invoice.store.billing_cif}\nDirección: ${invoice.store.address}`
            ]],
            styles: { fontSize: 10 },
            columnStyles: { 0: { cellWidth: 90 }, 1: { cellWidth: 90 } }
        });

        // **🛠 Solución: Obtener la referencia de la tabla correctamente**
        const table = autoTable(pdf, {
            startY: (pdf as any).autoTable.previous?.finalY ? (pdf as any).autoTable.previous.finalY + 10 : 70,
            head: [['Descripción', 'Cantidad', 'Precio (Sin IVA)', 'IVA (%)', 'Subtotal (Con IVA)']],
            body: invoice.products.map((product: any) => {
                const priceWithoutIVA = product.price / (1 + product.iva / 100);
                const subtotalConIVA = product.price * product.cantidad;
                return [
                    product.description,
                    product.cantidad,
                    `€${priceWithoutIVA.toFixed(2)}`,
                    `${product.iva}%`,
                    `€${subtotalConIVA.toFixed(2)}`
                ];
            }),
            styles: { fontSize: 10 },
            headStyles: { fillColor: [33, 150, 243], textColor: [255, 255, 255] }
        });

        // **✅ Nueva forma de obtener la posición final de la tabla**
        const finalY = (table as any).lastAutoTable?.finalY || 90;

        // Resumen de importes
        autoTable(pdf, {
            startY: finalY + 10,
            body: [
                ['Subtotal (Sin IVA):', `€${invoice.products.reduce((sum: number, product: any) => sum + product.price / (1 + product.iva / 100) * product.cantidad, 0).toFixed(2)}`],
                ['IVA Total:', `€${invoice.products.reduce((sum: number, product: any) => sum + product.cantidad * product.price - (product.price / (1 + product.iva / 100)) * product.cantidad, 0).toFixed(2)}`],
                ['Total (Con IVA):', `€${invoice.total.toFixed(2)}`],
            ],
            styles: { fontSize: 10 },
            bodyStyles: { fontSize: 10, halign: 'right' },
            columnStyles: { 0: { halign: 'right', cellWidth: 130 }, 1: { halign: 'right', cellWidth: 50 } }
        });

        // Mensaje final
        pdf.setFontSize(10);
        pdf.text(
            'Gracias por su compra. Para cualquier consulta, contáctenos.',
            105,
            pdf.internal.pageSize.height - 20,
            { align: 'center' }
        );

        // Guardar el archivo
        pdf.save(`Factura-${year}-${invoice.numberInvoice}-${invoice.store.name}.pdf`);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
            📄 Descargar Factura en PDF
        </Button>
    );
};

export default PDFGenerator;
