import { useEffect, useState } from "react";
import supplierService from "../services/supplierService";
import SupplierList from "../components/SupplierList";
import SupplierForm from "../components/SupplierForm";

function SuppliersPage() {

    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {

        try {

            const response = await supplierService.getAll();

            setSuppliers(response.data);

        } catch (error) {

            console.error(error);

        }

    };
    const handleDelete = async (id) => {

    const confirmation = window.confirm(
        "Voulez-vous vraiment supprimer ce fournisseur ?"
    );

    if (!confirmation) {
        return;
    }

    try {

        await supplierService.remove(id);

        await loadSuppliers();

    } catch (error) {

        console.error(error);

    }

};

    const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
};

    const handleCreate = async (data) => {

    try {

        if (editingSupplier) {

            const confirmation = window.confirm(
                "Voulez-vous vraiment modifier ce fournisseur ?"
            );

            if (!confirmation) {
                return;
            }

            await supplierService.update(editingSupplier.id, data);

            setEditingSupplier(null);

        } else {

            await supplierService.create(data);

        }

        await loadSuppliers();

    } catch (error) {

        if (error.response && error.response.status === 422) {
            throw error.response.data.errors;
        }

        throw error;
    }



};
    return (

        <div className="container mt-4">

            <h2>Gestion des fournisseurs</h2>
            <SupplierForm
            onSubmit={handleCreate}
            editingSupplier={editingSupplier}
            />
            <SupplierList
            suppliers={suppliers}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />
        </div>

    );

}

export default SuppliersPage;