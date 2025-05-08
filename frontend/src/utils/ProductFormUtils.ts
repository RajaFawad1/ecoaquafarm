// src/utils/ProductFormUtils.ts

/**
 * Convierte un string en número si es posible, o retorna undefined si no hay valor.
 */
export const parseNumberValue = (value: string): number | undefined => {
    return value ? Number(value) : undefined;
};

/**
 * Función genérica para actualizar un campo de un objeto.
 */
export const updateField = <T>(prev: T, field: keyof T, value: any): T => {
    return { ...prev, [field]: value };
};
