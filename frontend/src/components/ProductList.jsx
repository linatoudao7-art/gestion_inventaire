import React from "react";

function ProductList({ products, selectedId, onSelect }) {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-center">
                {/* --- EN-TÊTE DU TABLEAU --- */}
                <thead className="table-light">
                    <tr className="text-secondary" style={{ fontSize: "0.95rem", fontWeight: "600" }}>
                        <th style={{ width: "8%" }}></th> {/* Espace pour le rond de sélection */}
                        <th style={{ width: "32%" }} className="text-dark fw-bold text-start ps-3">Nom</th>
                        <th style={{ width: "25%" }} className="text-dark fw-bold">Catégorie</th>
                        <th style={{ width: "15%" }} className="text-dark fw-bold">Stock</th>
                        <th style={{ width: "20%" }} className="text-dark fw-bold">Statut</th>
                    </tr>
                </thead>
                
                {/* --- CORPS DU TABLEAU --- */}
                <tbody>
                    {products.length === 0 ? (
                        /* Cas où aucun produit n'est disponible */
                        <tr>
                            <td colSpan="5" className="text-center py-5 text-muted">
                                <i className="bi bi-box fs-2 d-block mb-2 text-secondary opacity-50"></i>
                                Aucun produit trouvé
                            </td>
                        </tr>
                    ) : (
                        /* Affichage de la liste de produits */
                        products.map(product => {
                            const isSelected = selectedId === product.id;
                            
                            // Un produit est considéré en stock faible s'il correspond au statut ou s'il passe sous son seuil d'alerte (par défaut : 5)
                            const isLowStock = product.stock_status === "Stock faible" || product.quantity <= (product.alert_threshold || 5);

                            return (
                                <tr
                                    key={product.id}
                                    onClick={() => onSelect(product.id)}
                                    // Utilisation d'une classe Bootstrap subtle si la ligne est sélectionnée
                                    className={isSelected ? "table-primary-subtle" : ""}
                                    style={{ 
                                        cursor: "pointer", 
                                        transition: "all 0.15s ease",
                                        // Ombre légère d'activation si sélectionné
                                        backgroundColor: isSelected ? "#f0f7ff" : "transparent" 
                                    }}
                                >
                                    {/* Colonne : Bouton Radio personnalisé */}
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="radio"
                                            name="product-select"
                                            className="form-check-input text-primary"
                                            checked={isSelected}
                                            onChange={() => onSelect(product.id)}
                                            style={{ 
                                                cursor: "pointer", 
                                                width: "1.15rem", 
                                                height: "1.15rem",
                                                border: isSelected ? "2px solid #0d6efd" : "1px solid #ced4da",
                                                boxShadow: isSelected ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)" : "none"
                                            }}
                                        />
                                    </td>

                                    {/* Colonne : Nom du produit */}
                                    <td className="text-dark fw-semibold text-start ps-3">
                                        {product.name}
                                    </td>

                                    {/* Colonne : Catégorie */}
                                    <td className="text-muted">
                                        {product.category?.name || (
                                            <span className="text-muted opacity-50 fst-italic">Sans catégorie</span>
                                        )}
                                    </td>

                                    {/* Colonne : Quantité en stock */}
                                    <td className="fw-bold text-dark">
                                        {product.quantity}
                                    </td>

                                    {/* Colonne : Statut de stock (Design moderne "Subtle" avec bordures fines) */}
                                    <td>
                                        {isLowStock ? (
                                            /* Statut : Stock Faible (Style Jaune/Orange discret) */
                                            <span 
                                                className="badge bg-warning-subtle text-warning border border-warning rounded-pill d-inline-flex align-items-center gap-1 py-2 px-3"
                                                style={{ fontSize: "0.80rem", fontWeight: "700" }}
                                            >
                                                <i className="bi bi-exclamation-circle-fill"></i>
                                                Faible
                                            </span>
                                        ) : (
                                            /* Statut : Stock Suffisant (Style Vert discret) */
                                            <span 
                                                className="badge bg-success-subtle text-success border border-success rounded-pill d-inline-flex align-items-center gap-1 py-2 px-3"
                                                style={{ fontSize: "0.80rem", fontWeight: "700" }}
                                            >
                                                <i className="bi bi-check-circle-fill"></i>
                                                Suffisant
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;