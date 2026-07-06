import { useEffect, useState } from "react";
import supplierService from "../services/supplierService";
import SupplierList from "../components/SupplierList";
import SupplierForm from "../components/SupplierForm";
import Swal from "sweetalert2";

function SuppliersPage() {

    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [showForm, setShowForm] = useState(false);

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

    const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Ce fournisseur sera supprimé définitivement.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler"
    });

    if (!result.isConfirmed) return;

    try {

        await supplierService.remove(id);

        await loadSuppliers();

        Swal.fire({
            icon: "success",
            title: "Supprimé !",
            text: "Fournisseur supprimé avec succès !",
            timer: 2000,
            showConfirmButton: false
        });

    } catch (error) {
        console.error(error);
    }

};

    const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
};

    const handleCreate = async (data) => {

    try {

        if (editingSupplier) {

            await supplierService.update(editingSupplier.id, data);

            setEditingSupplier(null);

        } else {

            await supplierService.create(data);

        }

        await loadSuppliers();
        Swal.fire({
        icon: "success",
        title: "Succès",
        text: editingSupplier
        ? "Fournisseur modifié avec succès !"
        : "Fournisseur ajouté avec succès !",
        timer: 2000,
        showConfirmButton: false
});


        setShowForm(false);
        setEditingSupplier(null);

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
            <button
            className="btn btn-primary mb-3"
            onClick={() => {
        setEditingSupplier(null);
        setShowForm(true);
    }}
        >
        Ajouter un fournisseur
        </button>
            {showForm && (
        <SupplierForm
        onSubmit={handleCreate}
        editingSupplier={editingSupplier}
        onCancel={() => {
            setShowForm(false);
            setEditingSupplier(null);
        }}
        />
    )}
            <SupplierList
            suppliers={suppliers}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />
        </div>

    );

}

export default SuppliersPage;