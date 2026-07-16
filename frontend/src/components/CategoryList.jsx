import React from "react";

function CategoryList({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                {/* --- EN-TÊTE DU TABLEAU --- */}
                <thead className="table-light">
                    <tr className="text-secondary" style={{ fontSize: "0.95rem", fontWeight: "600" }}>
                        <th style={{ width: "10%" }}></th> {/* Espace pour le rond de sélection */}
                        <th style={{ width: "40%" }} className="text-dark fw-bold">Nom</th>
                        <th style={{ width: "50%" }} className="text-dark fw-bold">Description</th>
                    </tr>
                </thead>

                {/* --- CORPS DU TABLEAU --- */}
                <tbody>
                    {categories.length === 0 ? (
                        /* Cas où aucune catégorie n'est disponible */
                        <tr>
                            <td colSpan="3" className="text-center py-5 text-muted">
                                <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary opacity-50"></i>
                                Aucune catégorie trouvée
                            </td>
                        </tr>
                    ) : (
                        /* Affichage de la liste de catégories */
                        categories.map(category => {
                            const isSelected = selectedCategory?.id === category.id;
                            return (
                                <tr
                                    key={category.id}
                                    onClick={() => onSelectCategory(category)}
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
                                            name="category-select"
                                            className="form-check-input text-primary"
                                            checked={isSelected}
                                            onChange={() => onSelectCategory(category)}
                                            style={{ 
                                                cursor: "pointer", 
                                                width: "1.15rem", 
                                                height: "1.15rem",
                                                border: isSelected ? "2px solid #0d6efd" : "1px solid #ced4da",
                                                boxShadow: isSelected ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)" : "none"
                                            }}
                                        />
                                    </td>

                                    {/* Colonne : Nom de la catégorie en semi-gras */}
                                    <td className="text-dark fw-semibold">
                                        {category.name}
                                    </td>

                                    {/* Colonne : Description (remplacée par un tiret propre "—" s'il n'y en a pas) */}
                                    <td className="text-muted">
                                        {category.description ? category.description : "—"}
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

export default CategoryList;