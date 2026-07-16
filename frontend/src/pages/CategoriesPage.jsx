import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import Swal from "sweetalert2";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showView, setShowView] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await categoryService.getAll();
            setCategories(response.data);
            setSelectedCategory(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectCategory = (category) => {
        if (selectedCategory?.id === category.id) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;

        const result = await Swal.fire({
            title: "Êtes-vous sûr ?",
            text: `La catégorie "${selectedCategory.name}" sera supprimée définitivement.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler"
        });

        if (!result.isConfirmed) return;

        try {
            await categoryService.remove(selectedCategory.id);
            await loadCategories();
            Swal.fire({
                icon: "success",
                title: "Supprimé !",
                text: "Catégorie supprimée avec succès !",
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
        if (!selectedCategory) return;
        setEditingCategory(selectedCategory);
        setShowForm(true);
    };

    const handleView = () => {
        if (!selectedCategory) return;
        setShowView(true);
    };

    const handleCreate = async (data) => {
        try {
            if (editingCategory) {
                await categoryService.update(editingCategory.id, data);
            } else {
                await categoryService.create(data);
            }
            await loadCategories();
            Swal.fire({
                icon: "success",
                title: "Succès",
                text: editingCategory ? "Catégorie modifiée avec succès !" : "Catégorie ajoutée avec succès !",
                timer: 2000,
                showConfirmButton: false
            });
            setShowForm(false);
            setEditingCategory(null);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                throw error.response.data.errors;
            }
            throw error;
        }
    };

    const handleExport = () => {
        window.open("http://127.0.0.1:8000/api/categories/export", "_blank");
    };

    const filteredCategories = categories.filter(cat =>
        cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Style unifié "carré arrondi" identique aux autres pages
    const inputStyle = {
        height: "42px",
        fontSize: "0.95rem",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        outline: "none"
    };

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Gestion de Catégories</h2>
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
                                    setEditingCategory(null);
                                    setShowForm(true);
                                }}
                            >
                                <i className="bi bi-plus-circle me-2 text-primary"></i>
                                Ajouter une catégorie
                            </button>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <button
                                className="dropdown-item"
                                disabled={!selectedCategory}
                                onClick={handleView}
                            >
                                <i className="bi bi-eye me-2"></i>
                                Voir
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item"
                                disabled={!selectedCategory}
                                onClick={handleEdit}
                            >
                                <i className="bi bi-pencil me-2"></i>
                                Modifier
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item text-danger"
                                disabled={!selectedCategory}
                                onClick={handleDelete}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Supprimer
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Zone de recherche unifiée */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-md-5">
                    <div className="position-relative">
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        <input
                            type="text"
                            className="form-control ps-5 text-muted"
                            placeholder="Rechercher une catégorie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>
            </div>

            {/* Tableau principal */}
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3">
                    <h5 className="fw-bold mb-0">
                        <i className="bi bi-tag me-2 text-primary"></i>
                        Liste des catégories
                    </h5>
                </div>

                <div className="table-responsive">
                    <CategoryList
                        categories={filteredCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleSelectCategory}
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
                                    {editingCategory
                                        ? "Modifier une catégorie"
                                        : "Ajouter une catégorie"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingCategory(null);
                                    }}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <CategoryForm
                                    onSubmit={handleCreate}
                                    editingCategory={editingCategory}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditingCategory(null);
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
                                    <i className="bi bi-tag me-2 text-primary"></i>
                                    Détails de la catégorie
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
                                            <td>{selectedCategory?.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{selectedCategory?.description || "-"}</td>
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

export default CategoriesPage;