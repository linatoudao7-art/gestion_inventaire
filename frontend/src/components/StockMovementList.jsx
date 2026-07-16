import React, { useState } from "react";

function StockMovementList({ movements = [], search, setSearch }) {
    // 1. ÉTATS : Pour filtrer par type (Entrée/Sortie) et par date
    const [typeFilter, setTypeFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // 2. FILTRAGE : Logique pour filtrer la liste en fonction de la recherche, du type et de la date
    const filteredMovements = movements.filter(movement => {
        // Recherche textuelle sur le nom du produit, le type ou l'observation
        const matchesSearch =
            (movement.product?.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (movement.type || "").toLowerCase().includes(search.toLowerCase()) ||
            (movement.observation || "").toLowerCase().includes(search.toLowerCase());

        // Filtrage par type (Entrée / Sortie)
        const matchesType = typeFilter === "" ? true : movement.type === typeFilter;

        // Extraction de la date (YYYY-MM-DD) pour la comparaison
        const movementDate = movement.created_at ? movement.created_at.substring(0, 10) : "";
        const matchesDate = dateFilter === "" ? true : movementDate === dateFilter;

        return matchesSearch && matchesType && matchesDate;
    });

    // 3. STYLE : Style commun pour les inputs et selects (effet "carré arrondi" moderne)
    const inputStyle = {
        height: "42px",
        fontSize: "0.95rem",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0", // Bordure fine gris clair
        borderRadius: "8px",         // Coins légèrement arrondis (carré arrondi)
        outline: "none"
    };

    return (
        <>
            {/* --- ZONE DE FILTRES (Recherche, Type et Date) --- */}
            <div className="row g-3 mb-4">
                {/* Barre de recherche par mot-clé */}
                <div className="col-12 col-md-5">
                    <div className="position-relative">
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        <input
                            type="text"
                            className="form-control ps-5 text-muted"
                            placeholder="Rechercher un produit..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Sélecteur de Type (Toutes, Entrée, Sortie) */}
                <div className="col-12 col-sm-6 col-md-3">
                    <select
                        className="form-select text-muted"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}
                    >
                        <option value="">Tous les Types</option>
                        <option value="entry">Entrée</option>
                        <option value="exit">Sortie</option>
                    </select>
                </div>

                {/* Sélecteur de Date avec bouton de réinitialisation */}
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="d-flex gap-2">
                        <input
                            type="date"
                            className="form-control text-muted"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            style={{ ...inputStyle, cursor: "pointer" }}
                        />
                        {/* Affiche le bouton 'X' uniquement si une date est sélectionnée */}
                        {dateFilter && (
                            <button
                                className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                                onClick={() => setDateFilter("")}
                                style={{ 
                                    width: "42px", 
                                    height: "42px", 
                                    borderRadius: "8px", 
                                    flexShrink: 0 
                                }}
                            >
                                <i className="bi bi-x fs-5"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* --- CARTE DU TABLEAU DES MOUVEMENTS --- */}
            <div className="card border-0 shadow-sm rounded-4">
                {/* En-tête de la carte */}
                <div className="card-header bg-white border-0 py-3 px-4">
                    <h5 className="fw-bold mb-0 d-flex align-items-center justify-content-center gap-2">
        <i className="bi bi-arrow-left-right text-primary"></i>
        Liste des mouvements
    </h5>
                </div>

                {/* Corps de la carte avec le tableau */}
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Date</th>
                                    <th>Produit</th>
                                    <th>Type</th>
                                    <th>Quantité</th>
                                    <th className="pe-4">Observation</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredMovements.length === 0 ? (
                                    /* Cas où aucun mouvement ne correspond aux filtres */
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center text-muted py-5"
                                        >
                                            <i className="bi bi-inbox fs-3 d-block mb-2 text-secondary"></i>
                                            Aucun mouvement enregistré
                                        </td>
                                    </tr>
                                ) : (
                                    /* Affichage de la liste filtrée */
                                    filteredMovements.map((movement) => (
                                        <tr key={movement.id}>
                                            {/* Date au format local français */}
                                            <td className="ps-4">
                                                {new Date(movement.created_at).toLocaleDateString("fr-FR")}
                                            </td>

                                            {/* Nom du produit */}
                                            <td className="fw-semibold">
                                                {movement.product?.name}
                                            </td>

                                            {/* Type de mouvement (Design moderne "Subtle" identique au Dashboard) */}
                                            <td>
                                                {movement.type === "entry" ? (
                                                    <span className="badge bg-success-subtle text-success border border-success rounded-pill px-3 py-1">
                                                        Entrée
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-danger-subtle text-danger border border-danger rounded-pill px-3 py-1">
                                                        Sortie
                                                    </span>
                                                )}
                                            </td>

                                            {/* Quantité en gras */}
                                            <td className="fw-bold">
                                                {movement.quantity}
                                            </td>

                                            {/* Observation ou tiret par défaut */}
                                            <td className="text-muted pe-4">
                                                {movement.observation || "—"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StockMovementList;