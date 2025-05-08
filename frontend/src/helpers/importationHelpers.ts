// importationHelpers.ts
export interface ProductRow {
    modelo: string;
    producto: string;
    qty: string | number;
    unitPrice: string | number;
    productBase?: number;     // Valor base calculado (qty * unitPrice)
    productOvercost?: number; // Sobrecoste asignado al producto
}

export interface InvoiceRow {
    invoiceRef: string;
    // Importe total de la factura (puede incluir licencias u otros gastos)
    amount?: number | '';
    products?: ProductRow[];
    baseTotal?: number; // Total a distribuir en la factura (suma de productos ajustados)
}

export interface TransportExpense {
    name: string;
    value: number;
    tax?: number;
    fixed?: boolean;
    description?: string;
}

export interface TaxExpense {
    name: string;
    value: number;
    fixed?: boolean;
    description?: string;
}

export interface SummaryData {
    totalMercancia: number;
    totalTransport: number;
    totalTransportTaxes: number;
    totalAdditionalTaxes: number;
    totalImpuestos: number;
    totalGeneral: number;
    distribution: any[]; // Puedes tipar esto de forma más específica según tus necesidades
}

/**
 * Calcula el resumen de importación a partir de facturas, gastos de transporte e impuestos.
 * 
 * Para cada factura:
 *  - Se calcula el total a partir de los productos (qty * unitPrice).
 *  - Si la factura tiene un importe (_amount_) mayor que el total calculado de los productos,
 *    se determina el "sobrecoste" (difference) que se reparte proporcionalmente entre los productos.
 *  - Cada producto tendrá una propiedad adicional "productOvercost" y su "productBase" se ajusta.
 *  - El total a repartir en la factura (baseTotal) será el total ajustado de productos.
 */
export const computeImportationSummary = (
    invoices: InvoiceRow[],
    transportExpenses: TransportExpense[],
    taxes: TaxExpense[]
): SummaryData => {
    // 1) Enriquecer las facturas con el cálculo de la base y el sobrecoste
    const invoicesWithBase = invoices.map((invoice) => {
        const products = invoice?.products ?? [];
        let computedProductsTotal = 0;
        // Calcular el total inicial de cada producto
        const initialProducts = products.map((p) => {
            const qty = Number(p.qty) || 0;
            const price = Number(p.unitPrice) || 0;
            const productBase = qty * price;
            computedProductsTotal += productBase;
            return { ...p, productBase };
        });
        // Determinar si hay sobrecoste (importe mayor al total de productos)
        const invoiceAmount =
            invoice.amount !== undefined && invoice.amount !== '' ? Number(invoice.amount) : 0;
        const overcost = invoiceAmount > computedProductsTotal ? invoiceAmount - computedProductsTotal : 0;
        // Distribuir el sobrecoste proporcionalmente entre los productos
        const adjustedProducts =
            computedProductsTotal > 0
                ? initialProducts.map((p) => {
                    const proportion = (p.productBase || 0) / computedProductsTotal;
                    const productOvercost = proportion * overcost;
                    const adjustedProductBase = (p.productBase || 0) + productOvercost;
                    return { ...p, productBase: adjustedProductBase, productOvercost };
                })
                : initialProducts;
        // El total base de la factura será la suma de los productos ajustados,
        // lo que equivale a computedProductsTotal + overcost (o el importe de la factura si es mayor)
        const baseTotal = computedProductsTotal + overcost;
        return {
            ...invoice,
            products: adjustedProducts,
            baseTotal,
        };
    });

    // 2) Totales globales
    const totalTransport = transportExpenses.reduce((acc, t) => acc + (t.value || 0), 0);
    const totalTransportTaxes = transportExpenses.reduce((acc, t) => acc + (t.tax || 0), 0);
    const totalAdditionalTaxes = taxes.reduce((acc, tx) => acc + (tx.value || 0), 0);
    const totalImpuestos = totalTransportTaxes + totalAdditionalTaxes;
    const totalMercancia = invoicesWithBase.reduce((acc, inv) => acc + (inv.baseTotal || 0), 0);
    const totalGeneral = totalTransport + totalMercancia + totalImpuestos;
    const gastosAdicionales = totalTransport + totalImpuestos;

    // 3) Distribución proporcional de gastos (transporte e impuestos) por factura y luego por producto
    const distribution =
        totalMercancia > 0
            ? invoicesWithBase.map((inv) => {
                const invoiceProportion = inv.baseTotal! / totalMercancia;
                const additionalForInvoice = invoiceProportion * gastosAdicionales;
                const finalInvoiceAmount = inv.baseTotal! + additionalForInvoice;
                const productDetails =
                    inv.baseTotal! > 0
                        ? inv.products?.map((p) => {
                            const prodProportion = (p.productBase || 0) / inv.baseTotal!;
                            const addForProd = prodProportion * additionalForInvoice;
                            const finalCost = (p.productBase || 0) + addForProd;
                            return {
                                ...p,
                                prodProportion,
                                additionalForProduct: addForProd,
                                finalProductCost: finalCost,
                            };
                        })
                        : inv.products?.map((p) => ({
                            ...p,
                            prodProportion: 0,
                            additionalForProduct: 0,
                            finalProductCost: 0,
                        }));
                return {
                    ...inv,
                    invoiceProportion,
                    additionalForInvoice,
                    finalInvoiceAmount,
                    products: productDetails,
                };
            })
            : [];

    return {
        totalMercancia,
        totalTransport,
        totalTransportTaxes,
        totalAdditionalTaxes,
        totalImpuestos,
        totalGeneral,
        distribution,
    };
};
