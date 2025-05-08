import { useRouter } from 'next/router';

const CreateReturnInvoice = () => {
    const router = useRouter();
    const { id } = router.query; // Captura el valor de `id` directamente del path dinámico

    // Si el id no está disponible, mostramos un mensaje de carga
    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Crear Factura de Devolución para #{id}</h2>
            {/* El resto de la lógica */}
        </div>
    );
};

export default CreateReturnInvoice;
