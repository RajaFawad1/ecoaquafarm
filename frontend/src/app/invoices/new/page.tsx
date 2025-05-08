'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ClientForm from '@/components/invoice/ClientForm';
import InvoiceDetailsForm from '@/components/invoice/InvoiceDetailsForm';
import ProductTable from '@/components/invoice/ProductTable';
import apiClient from '@/utils/apiClient';

const NewInvoicePage = () => {
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState<any[]>([]);
    const [invoiceData, setInvoiceData] = useState({
        total: 0,
        paymentMethod: 'tarjeta',
        paymentDate: '',
        clientId: '',
        storeId: '',
        products: [],
    });
    const [clientData, setClientData] = useState({
        nombre: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        codigoPostal: '',
        provincia: '',
        pais: '',
        dniCif: '',
        email: '',
        mensaje: '',
    });
    const [defaultClient, setDefaultClient] = useState<any>(null); // Cliente predeterminado

    const [productFields, setProductFields] = useState({
        description: '',
        cantidad: 1,
        price: 0,
        iva: 21,
    });

    const [errors, setErrors] = useState({
        clientData: '',
        products: '',
        invoiceData: '', // 👈 Agregar esta línea
    });


    useEffect(() => {
        const fetchStoresAndDefaultClient = async () => {
            try {
                // Obtener las tiendas
                const storesResponse = await apiClient.get('/stores');
                setStores(storesResponse.data);

                // Obtener el cliente predeterminado
                const clientResponse = await apiClient.get('/clients/default');
                setDefaultClient(clientResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchStoresAndDefaultClient();
    }, []);

    const validateInvoiceData = () => {
        if (!invoiceData.storeId) {
            setErrors((prev) => ({
                ...prev,
                invoiceData: 'Debe seleccionar una tienda.',
            }));
            return false;
        }
        setErrors((prev) => ({ ...prev, invoiceData: '' }));
        return true;
    };

    const validateProducts = () => {
        if (products.length === 0) {
            setErrors((prev) => ({
                ...prev,
                products: 'Debe agregar al menos un producto.',
            }));
            return false;
        }
        setErrors((prev) => ({ ...prev, products: '' }));
        return true;
    };



    const handleCreateInvoice = async () => {
        if (!validateInvoiceData() || !validateProducts()) {
            return;
        }

        try {
            let clientId = defaultClient?.id;

            // Si se ingresaron datos de cliente, crearlo en el backend
            if (clientData.nombre || clientData.direccion || clientData.dniCif) {
                const newClient = await apiClient.post('/clients', clientData);
                clientId = newClient.data.id;
            }

            const payload = { ...invoiceData, clientId, products };
            await apiClient.post('/invoices', payload);
            alert('✅ Factura creada correctamente.');
        } catch (error) {
            console.error('Error creating invoice:', error);
            alert('❌ Error al crear la factura.');
        }
    };
    const handleAddProductWithoutTax = () => {
        if (!productFields.description || productFields.price <= 0 || productFields.cantidad <= 0) {
            alert('Por favor, completa todos los campos del producto correctamente.');
            return;
        }

        const newProduct = { ...productFields, id: Math.random().toString(36).substr(2, 9) };
        setProducts([...products, newProduct]);

        // Calcular el total
        const newTotal =
            products.reduce((sum, p) => sum + p.cantidad * p.price * (1 + p.iva / 100), 0) +
            newProduct.cantidad * newProduct.price * (1 + newProduct.iva / 100);
        setInvoiceData({ ...invoiceData, total: newTotal });

        // Resetear campos
        setProductFields({
            description: '',
            cantidad: 1,
            price: 0,
            iva: 21,
        });
    };

    const handleAddProductWithTax = () => {
        if (!productFields.description || productFields.price <= 0 || productFields.cantidad <= 0) {
            alert('Por favor, completa todos los campos del producto correctamente.');
            return;
        }

        // Calcular precio sin IVA
        const priceWithoutTax = productFields.price / (1 + productFields.iva / 100);
        const newProduct = { ...productFields, price: priceWithoutTax, id: Math.random().toString(36).substr(2, 9) };
        setProducts([...products, newProduct]);

        // Calcular el total
        const newTotal =
            products.reduce((sum, p) => sum + p.cantidad * p.price * (1 + p.iva / 100), 0) +
            newProduct.cantidad * priceWithoutTax * (1 + newProduct.iva / 100);
        setInvoiceData({ ...invoiceData, total: newTotal });

        // Resetear campos
        setProductFields({
            description: '',
            cantidad: 1,
            price: 0,
            iva: 21,
        });
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                🧾 Crear Nueva Factura
            </Typography>

            {/* Mostrar errores generales */}
            {errors.invoiceData && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                    {errors.invoiceData}
                </Typography>
            )}
            {errors.products && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                    {errors.products}
                </Typography>
            )}
            <InvoiceDetailsForm
                invoiceData={invoiceData}
                setInvoiceData={setInvoiceData}
                stores={stores}
            />
            {/* Formulario de Cliente */}
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                👤 Cliente (Predeterminado: Clientes_Varios)
            </Typography>
            <ClientForm clientData={clientData} setClientData={setClientData} />

            <ProductTable
                products={products}
                productFields={productFields}
                setProductFields={setProductFields}
                handleAddProductWithoutTax={handleAddProductWithoutTax}
                handleAddProductWithTax={handleAddProductWithTax}
            />

            <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleCreateInvoice}
                    sx={{ padding: '10px 30px', fontSize: '16px' }}
                >
                    💾 Crear Factura
                </Button>
            </Box>
        </Box>
    );
};

export default NewInvoicePage;
