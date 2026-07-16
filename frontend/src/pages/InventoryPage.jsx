import { useEffect, useState } from "react";
import inventoryService from "../services/inventoryService";
import stockMovementService from "../services/stockMovementService";

function InventoryPage() {
    const [inventory, setInventory] = useState([]);
    const [search, setSearch] = useState("");
    const [stockFilter, setStockFilter] = useState(""); // "" (Tous), "out" (Rupture), "low" (Faible), "ok" (Suffisant)
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        try {
            const response = await inventoryService.getAll();
            setInventory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadHistory = async (product) => {
        try {
            const response = await stockMovementService.history(product.id);
            setHistory(response.data);
            setSelectedProduct(product);
            setShowHistory(true);
        } catch (error) {
            console.error(error);
        }
    };

    // Filtrage combinant Recherche par NOM uniquement + Filtre d'état du Stock
    const filteredInventory = inventory.filter(item => {
        const productName = (item.name || "").toLowerCase();
        const searchString = search.toLowerCase();
        const matchesSearch = productName.includes(searchString);

        let matchesStock = true;
        const remaining = item.remaining || 0;
        const threshold = item.alert_threshold || 0;

        if (stockFilter === "out") {
            matchesStock = remaining === 0;
        } else if (stockFilter === "low") {
            matchesStock = remaining > 0 && remaining <= threshold;
        } else if (stockFilter === "ok") {
            matchesStock = remaining > threshold;
        }

        return matchesSearch && matchesStock;
    });

    // Style "carré arrondi" pour les filtres
    const inputStyle = {
        height: "42px",
        fontSize: "0.95rem",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        outline: "none"
    };

    return (
        <div className="container-fluid py-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="mb-4 d-flex justify-content-start">
    <h2 className="fw-bold mb-1">
        Gestion de l'inventaire
    </h2>
</div>
                <div className="mb-2">
                    <button
                        className="btn p-0 border-0 bg-transparent"
                        data-bs-toggle="dropdown"
                    >
                        <i className="bi bi-list fs-3 text-secondary"></i>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                        <li>
                            <a
                                href="http://127.0.0.1:8000/api/inventory/export"
                                className="dropdown-item py-2"
                            >
                                <i className="bi bi-file-earmark-excel text-success me-2"></i>
                                Exporter Excel
                            </a>
                        </li>
                        <li>
                            {/* Le bouton d'historique réactivé uniquement si un produit est sélectionné */}
                            <button
                                className="dropdown-item py-2"
                                disabled={!selectedProduct}
                                onClick={() => loadHistory(selectedProduct)}
                            >
                                <i className="bi bi-clock-history me-2 text-primary"></i>
                                Voir l'historique
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Zone des filtres (Recherche par NOM + État de Stock) */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-md-5">
                    <div className="position-relative">
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        <input
                            type="text"
                            className="form-control ps-5 text-muted"
                            placeholder="Rechercher par nom..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-3">
                    <select
                        className="form-select text-muted"
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}
                    >
                        <option value="">Tous les états de stock</option>
                        <option value="ok">Stock suffisant</option>
                        <option value="low">Stock faible</option>
                        <option value="out">Rupture</option>
                    </select>
                </div>
            </div>

            {/* Tableau principal */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 py-3 px-4">
                    <h5 className="fw-bold mb-0">
                        <i className="bi bi-clipboard-check text-primary me-2"></i>
                        Liste de l'inventaire
                    </h5>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr className="text-secondary" style={{ fontSize: "0.95rem", fontWeight: "600" }}>
                                    <th style={{ width: "60px" }}></th>
                                    <th className="text-dark fw-bold">Produit</th>
                                    <th className="text-dark fw-bold">Catégorie</th>
                                    <th className="text-dark fw-bold">Fournisseur</th>
                                    <th className="text-dark fw-bold">Acheté</th>
                                    <th className="text-dark fw-bold">Vendu</th>
                                    <th className="text-dark fw-bold">Stock</th>
                                    <th className="text-dark fw-bold">État</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredInventory.map(item => {
                                    const isSelected = selectedProduct?.id === item.id;
                                    return (
                                        <tr 
                                            key={item.id}
                                            onClick={() => setSelectedProduct(item)}
                                            className={isSelected ? "table-primary-subtle" : ""}
                                            style={{ 
                                                cursor: "pointer", 
                                                transition: "all 0.15s ease",
                                                backgroundColor: isSelected ? "#f0f7ff" : "transparent"
                                            }}
                                        >
                                            {/* Bouton Radio Personnalisé */}
                                            <td onClick={(e) => e.stopPropagation()} className="text-center">
                                                <input
                                                    type="radio"
                                                    name="inventory-select"
                                                    className="form-check-input text-primary"
                                                    checked={isSelected}
                                                    onChange={() => setSelectedProduct(item)}
                                                    style={{ 
                                                        cursor: "pointer", 
                                                        width: "1.15rem", 
                                                        height: "1.15rem",
                                                        border: isSelected ? "2px solid #0d6efd" : "1px solid #ced4da",
                                                        boxShadow: isSelected ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)" : "none"
                                                    }}
                                                />
                                            </td>

                                            <td className="text-dark fw-semibold">
                                                {item.name}
                                            </td>

                                            <td className="text-muted">{item.category ? item.category : "—"}</td>
                                            <td className="text-muted">{item.supplier ? item.supplier : "—"}</td>
                                            
                                            <td>
                                                <span className="badge bg-success-subtle text-success px-2.5 py-1.5 rounded-pill">
                                                    {item.purchased}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge bg-danger-subtle text-danger px-2.5 py-1.5 rounded-pill">
                                                    {item.sold}
                                                </span>
                                            </td>
                                            <td>
                                                <strong className="text-dark">{item.remaining}</strong>
                                            </td>
                                            
                                            <td>
                                                {item.remaining === 0 ? (
                                                    <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
                                                        Rupture
                                                    </span>
                                                ) : item.remaining <= item.alert_threshold ? (
                                                    <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill px-3 py-2">
                                                        Stock faible
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                                        Suffisant
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {filteredInventory.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-5 text-muted">
                                            <i className="bi bi-box-seam fs-1 d-block mb-3 opacity-50"></i>
                                            Aucun produit trouvé
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ================= MODAL HISTORIQUE ================= */}
            {showHistory && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(15, 23, 42, 0.45)",
                        backdropFilter: "blur(4px)"
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow-lg">
                            <div className="modal-header border-0 pb-0 pt-4 px-4">
                                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                                    <i className="bi bi-clock-history text-primary"></i>
                                    Mouvements : {selectedProduct?.name}
                                </h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowHistory(false)}
                                ></button>
                            </div>

                            <div className="modal-body px-4 py-3">
                                <div className="table-responsive rounded-3 border">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr className="text-secondary" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                                                <th>Date</th>
                                                <th>Type</th>
                                                <th className="text-end">Quantité</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.length > 0 ? (
                                                history.map(movement => (
                                                    <tr key={movement.id}>
                                                        <td className="text-muted" style={{ fontSize: "0.9rem" }}>
                                                            {new Date(movement.created_at).toLocaleString("fr-FR", {
                                                                day: "numeric",
                                                                month: "short",
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })}
                                                        </td>
                                                        <td>
                                                            {movement.type === "entry" ? (
                                                                <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1">
                                                                    Entrée
                                                                </span>
                                                            ) : (
                                                                <span className="badge bg-danger-subtle text-danger rounded-pill px-2 py-1">
                                                                    Sortie
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="text-end fw-bold text-dark">
                                                            {movement.quantity}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center text-muted py-4">
                                                        <i className="bi bi-inbox fs-2 d-block mb-2 text-muted opacity-50"></i>
                                                        Aucun mouvement enregistré
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="modal-footer border-0 pt-0 pb-4 px-4">
                                <button
                                    className="btn btn-light border fw-semibold rounded-3 px-4"
                                    onClick={() => setShowHistory(false)}
                                >
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

export default InventoryPage;