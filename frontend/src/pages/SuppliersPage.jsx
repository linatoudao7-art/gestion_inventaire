import { useEffect, useState } from "react";
import supplierService from "../services/supplierService";
import SupplierList from "../components/SupplierList";
import SupplierForm from "../components/SupplierForm";
import Swal from "sweetalert2";

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [showView, setShowView] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        try {
            const response = await supplierService.getAll();
            setSuppliers(response.data);
            setSelectedSupplier(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectSupplier = (supplier) => {
        if (selectedSupplier?.id === supplier.id) {
            setSelectedSupplier(null);
        } else {
            setSelectedSupplier(supplier);
        }
    };

    const handleDelete = async () => {
        if (!selectedSupplier) return;

        const result = await Swal.fire({
            title: "Êtes-vous sûr ?",
            text: `Le fournisseur "${selectedSupplier.name}" sera supprimé définitivement.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler"
        });

        if (!result.isConfirmed) return;

        try {
            await supplierService.remove(selectedSupplier.id);
            await loadSuppliers();
            Swal.fire({
                icon: "success",
                title: "Supprimé !",
                text: "Fournisseur supprimé avec succès !",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Suppression impossible",
                text: error.response?.data?.message || "Une erreur est survenue."
            });
        }
    };

    const handleEdit = () => {
        if (!selectedSupplier) return;
        setEditingSupplier(selectedSupplier);
        setShowForm(true);
    };

    const handleView = () => {
        if (!selectedSupplier) return;
        setShowView(true);
    };

    const handleCreate = async (data) => {
        try {
            if (editingSupplier) {
                await supplierService.update(editingSupplier.id, data);
            } else {
                await supplierService.create(data);
            }
            await loadSuppliers();
            Swal.fire({
                icon: "success",
                title: "Succès",
                text: editingSupplier ? "Fournisseur modifié avec succès !" : "Fournisseur ajouté avec succès !",
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

    const handleExport = () => {
        window.open("http://127.0.0.1:8000/api/suppliers/export", "_blank");
    };

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Gestion de Fournisseurs</h2>
                </div>

                <div className="mb-2">
                    <button
                        className="btn p-0 border-0 bg-transparent"
                        data-bs-toggle="dropdown"
                    >
                        <i className="bi bi-list fs-3"></i>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow">
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    setEditingSupplier(null);
                                    setShowForm(true);
                                }}
                            >
                                <i className="bi bi-plus-circle me-2 text-primary"></i>
                                Ajouter un fournisseur
                            </button>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <button
                                className="dropdown-item"
                                disabled={!selectedSupplier}
                                onClick={handleView}
                            >
                                <i className="bi bi-eye me-2"></i>
                                Voir
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item"
                                disabled={!selectedSupplier}
                                onClick={handleEdit}
                            >
                                <i className="bi bi-pencil me-2"></i>
                                Modifier
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item text-danger"
                                disabled={!selectedSupplier}
                                onClick={handleDelete}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Supprimer
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Tableau principal (La barre de recherche a été supprimée d'ici) */}
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3">
                    <h5 className="fw-bold mb-0">
                        <i className="bi bi-truck me-2 text-primary"></i>
                        Liste des fournisseurs
                    </h5>
                </div>

                <div className="table-responsive">
                    <SupplierList
                        suppliers={suppliers}
                        selectedSupplier={selectedSupplier}
                        onSelectSupplier={handleSelectSupplier}
                    />
                </div>
            </div>

            {/* Modal de création/édition */}
            {showForm && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingSupplier
                                        ? "Modifier un fournisseur"
                                        : "Ajouter un fournisseur"}
                                    
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingSupplier(null);
                                    }}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <SupplierForm
                                    onSubmit={handleCreate}
                                    editingSupplier={editingSupplier}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditingSupplier(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de détails */}
            {showView && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="bi bi-truck me-2 text-primary"></i>
                                    Détails du fournisseur
                                </h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowView(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <table className="table table-borderless align-middle">
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "30%" }}>Nom</th>
                                            <td>{selectedSupplier?.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Téléphone</th>
                                            <td>{selectedSupplier?.phone || "-"}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{selectedSupplier?.email || "-"}</td>
                                        </tr>
                                        <tr>
                                            <th>Adresse</th>
                                            <td>{selectedSupplier?.address || "-"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShowView(false)}
                                >
                                    <i className="bi bi-x-circle me-2"></i>
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SuppliersPage;