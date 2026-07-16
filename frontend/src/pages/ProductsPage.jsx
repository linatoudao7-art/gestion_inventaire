import { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import categoryService from "../services/categoryService";
import supplierService from "../services/supplierService";
import Swal from "sweetalert2";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // id de la ligne sélectionnée dans le tableau (une seule à la fois)
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        loadProducts();
        loadCategories();
        loadSuppliers();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await productService.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Plus besoin d'appeler l'API à chaque lettre tapée !
    const handleSearch = (value) => {
        setSearch(value);
    };

    // Plus besoin d'appeler l'API à chaque changement de catégorie !
    const handleCategoryFilter = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleCreate = async (data) => {
        try {
            if (editingProduct) {
                await productService.update(editingProduct.id, data);
                setEditingProduct(null);
            } else {
                await productService.create(data);
            }
            await loadProducts();

            Swal.fire({
                icon: "success",
                title: "Succès",
                text: editingProduct
                    ? "Produit modifié avec succès !"
                    : "Produit ajouté avec succès !",
                timer: 2000,
                showConfirmButton: false
            });

            setShowForm(false);
            setEditingProduct(null);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                throw error.response.data.errors;
            }
            throw error;
        }
    };

    const loadCategories = async () => {
        try {
            const response = await categoryService.getAll();
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadSuppliers = async () => {
        try {
            const response = await supplierService.getAll();
            setSuppliers(response.data);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                throw error.response.data.errors;
            }
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Cette action est irréversible !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler"
        });

        if (!result.isConfirmed) return;

        try {
            await productService.remove(id);
            await loadProducts();
            
            // On réinitialise la sélection puisque la ligne n'existe plus
            setSelectedId(null);
            setSelectedProduct(null);

            Swal.fire({
                icon: "success",
                title: "Supprimé !",
                text: "Le produit a été supprimé avec succès.",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (product) => {
        console.log(product);
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleView = (product) => {
        setSelectedProduct(product);
        setShowDetails(true);
    };

    const handleExport = () => {
        window.open("http://127.0.0.1:8000/api/products/export", "_blank");
    };

    // Produit actuellement sélectionné dans le tableau (recherché par id)
    const selectedProductRow = products.find((p) => p.id === selectedId);

    const handleMenuView = () => {
        if (selectedProductRow) handleView(selectedProductRow);
    };

    const handleMenuEdit = () => {
        if (selectedProductRow) handleEdit(selectedProductRow);
    };

    const handleMenuDelete = () => {
        if (selectedId) handleDelete(selectedId);
    };

    // ==========================================
    // LOGIQUE DE FILTRAGE COMBINÉ (CLIENT)
    // ==========================================
    const filteredProducts = products.filter(product => {
        // 1. Recherche par nom (insensible à la casse)
        const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase());
        
        // 2. Filtrage par catégorie
        const matchesCategory = selectedCategory === "" || String(product.category_id) === String(selectedCategory);
        
        return matchesSearch && matchesCategory;
    });

    // Style unifié "carré arrondi"
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
                    <h2 className="fw-bold mb-1">Gestion de Produits</h2>
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
                                    setEditingProduct(null);
                                    setShowForm(true);
                                }}
                            >
                                <i className="bi bi-plus-circle me-2 text-primary"></i>
                                Ajouter un produit
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item"
                                onClick={handleExport}
                            >
                                <i className="bi bi-file-earmark-excel me-2 text-success"></i>
                                Exporter vers Excel
                            </button>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <button
                                className="dropdown-item"
                                disabled={!selectedId}
                                onClick={handleMenuView}
                            >
                                <i className="bi bi-eye me-2"></i>
                                Voir
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item"
                                disabled={!selectedId}
                                onClick={handleMenuEdit}
                            >
                                <i className="bi bi-pencil me-2"></i>
                                Modifier
                            </button>
                        </li>

                        <li>
                            <button
                                className="dropdown-item text-danger"
                                disabled={!selectedId}
                                onClick={handleMenuDelete}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Supprimer
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Zone des filtres (Recherche par NOM + Filtrage par Catégorie) */}
            <div className="row g-3 mb-4">
                {/* Recherche */}
                <div className="col-12 col-md-5">
                    <div className="position-relative">
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        <input
                            type="text"
                            className="form-control ps-5 text-muted"
                            placeholder="Rechercher par nom..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Sélecteur de catégories */}
                <div className="col-12 col-sm-6 col-md-3">
                    <select
                        className="form-select text-muted"
                        value={selectedCategory}
                        onChange={(e) => handleCategoryFilter(e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Tableau principal */}
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3">
                    <h5 className="fw-bold mb-0">
                        <i className="bi bi-box-seam me-2 text-primary"></i>
                        Liste des produits
                    </h5>
                </div>

                <div className="table-responsive">
                    <ProductList
                        products={filteredProducts} // <-- C'est ici qu'on passe la liste intelligemment filtrée !
                        selectedId={selectedId}
                        onSelect={setSelectedId}
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
                                    {editingProduct
                                        ? "Modifier un produit"
                                        : "Ajouter un produit"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingProduct(null);
                                    }}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <ProductForm
                                    onSubmit={handleCreate}
                                    editingProduct={editingProduct}
                                    categories={categories}
                                    suppliers={suppliers}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditingProduct(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de détails (Sécurisé avec "showDetails && selectedProduct") */}
            {showDetails && selectedProduct && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="bi bi-box-seam me-2 text-primary"></i>
                                    Détails du produit
                                </h5>
                                <button
                                    className="btn-close"
                                    onClick={() => {
                                        setShowDetails(false);
                                        setSelectedProduct(null);
                                    }}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <table className="table table-borderless align-middle">
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "30%" }}>Nom</th>
                                            <td>{selectedProduct.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{selectedProduct.description || "-"}</td>
                                        </tr>
                                        <tr>
                                            <th>Catégorie</th>
                                            <td>{selectedProduct.category?.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Fournisseur</th>
                                            <td>{selectedProduct.supplier?.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Prix d'achat</th>
                                            <td>{selectedProduct.purchase_price} FCFA</td>
                                        </tr>
                                        <tr>
                                            <th>Prix de vente</th>
                                            <td>{selectedProduct.sale_price} FCFA</td>
                                        </tr>
                                        <tr>
                                            <th>Quantité</th>
                                            <td>{selectedProduct.quantity}</td>
                                        </tr>
                                        <tr>
                                            <th>Seuil d'alerte</th>
                                            <td>{selectedProduct.alert_threshold}</td>
                                        </tr>
                                        <tr>
                                            <th>Statut</th>
                                            <td>
                                                {selectedProduct.stock_status === "Stock faible" ? (
                                                    <span className="badge bg-danger">
                                                        Stock faible
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-success">
                                                        Stock suffisant
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setShowDetails(false);
                                        setSelectedProduct(null);
                                    }}
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

export default ProductsPage;