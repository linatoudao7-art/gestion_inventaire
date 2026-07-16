import React from "react";

function SupplierList({ suppliers, selectedSupplier, onSelectSupplier }) {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                {/* --- EN-TÊTE DU TABLEAU --- */}
                <thead className="table-light">
                    <tr className="text-secondary" style={{ fontSize: "0.95rem", fontWeight: "600" }}>
                        <th style={{ width: "8%" }}></th> {/* Espace pour le rond de sélection */}
                        <th style={{ width: "27%" }} className="text-dark fw-bold">Nom</th>
                        <th style={{ width: "20%" }} className="text-dark fw-bold">Téléphone</th>
                        <th style={{ width: "25%" }} className="text-dark fw-bold">Email</th>
                        <th style={{ width: "20%" }} className="text-dark fw-bold">Adresse</th>
                    </tr>
                </thead>

                {/* --- CORPS DU TABLEAU --- */}
                <tbody>
                    {suppliers.length === 0 ? (
                        /* Cas où aucun fournisseur n'est disponible */
                        <tr>
                            <td colSpan="5" className="text-center py-5 text-muted">
                                <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary opacity-50"></i>
                                Aucun fournisseur trouvé
                            </td>
                        </tr>
                    ) : (
                        /* Affichage de la liste de fournisseurs */
                        suppliers.map(supplier => {
                            const isSelected = selectedSupplier?.id === supplier.id;
                            return (
                                <tr
                                    key={supplier.id}
                                    onClick={() => onSelectSupplier(supplier)}
                                    className={isSelected ? "table-primary-subtle" : ""}
                                    style={{ 
                                        cursor: "pointer", 
                                        transition: "all 0.15s ease",
                                        backgroundColor: isSelected ? "#f0f7ff" : "transparent"
                                    }}
                                >
                                    {/* Colonne : Bouton Radio personnalisé */}
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="radio"
                                            name="supplier-select"
                                            className="form-check-input text-primary"
                                            checked={isSelected}
                                            onChange={() => onSelectSupplier(supplier)}
                                            style={{ 
                                                cursor: "pointer", 
                                                width: "1.15rem", 
                                                height: "1.15rem",
                                                border: isSelected ? "2px solid #0d6efd" : "1px solid #ced4da",
                                                boxShadow: isSelected ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)" : "none"
                                            }}
                                        />
                                    </td>

                                    {/* Colonne : Nom du fournisseur en semi-gras */}
                                    <td className="text-dark fw-semibold">
                                        {supplier.name}
                                    </td>

                                    {/* Colonne : Téléphone */}
                                    <td className="text-muted">
                                        {supplier.phone ? supplier.phone : "—"}
                                    </td>

                                    {/* Colonne : Email (tronqué proprement si trop long) */}
                                    <td className="text-muted" title={supplier.email || ""}>
                                        {supplier.email ? (
                                            supplier.email.length > 18
                                                ? supplier.email.substring(0, 18) + "..."
                                                : supplier.email
                                        ) : (
                                            "—"
                                        )}
                                    </td>

                                    {/* Colonne : Adresse (tronquée proprement si trop longue) */}
                                    <td className="text-muted" title={supplier.address || ""}>
                                        {supplier.address ? (
                                            supplier.address.length > 18
                                                ? supplier.address.substring(0, 18) + "..."
                                                : supplier.address
                                        ) : (
                                            "—"
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

export default SupplierList;