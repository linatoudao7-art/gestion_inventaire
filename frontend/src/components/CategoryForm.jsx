import { useEffect, useState } from "react";

function CategoryForm({ onSubmit, editingCategory, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    
    const [errors, setErrors] = useState({});

    // Synchronisation avec la catégorie en cours d'édition
    useEffect(() => {
        if (editingCategory) {
            setFormData({
                name: editingCategory.name || "",
                description: editingCategory.description || ""
            });
        } else {
            setFormData({
                name: "",
                description: ""
            });
        }
        setErrors({});
    }, [editingCategory]);

    // Nettoyage dynamique à la saisie (uniquement lettres, chiffres, espaces, tirets)
    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "name") {
            value = value.replace(/[^a-zA-ZÀ-ÿ0-9\s'-]/g, "");
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validation côté client
        if (!formData.name.trim()) {
            newErrors.name = ["Le nom de la catégorie est obligatoire."];
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await onSubmit(formData);
            setErrors({});
            
            // Reset seulement si on n'est pas en train d'éditer
            if (!editingCategory) {
                setFormData({
                    name: "",
                    description: ""
                });
            }
        } catch (apiErrors) {
            setErrors(apiErrors);
        }
    };

    // Fonction utilitaire pour afficher proprement les erreurs (Tableau ou String)
    const renderError = (field) => {
        if (!errors[field]) return null;
        const message = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
        return (
            <div className="text-danger small mt-1 fw-medium" style={{ fontSize: "0.85rem" }}>
                <i className="bi bi-exclamation-circle me-1"></i>
                {message}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="px-2" noValidate>
            <div className="row g-3">
                
                {/* Champ : Nom de la catégorie */}
                <div className="col-12">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-tags text-primary"></i> Nom de la catégorie <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.name ? "is-invalid" : ""}`}
                        name="name"
                        placeholder="Ex: Électronique, Alimentation..."
                        value={formData.name}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem" }}
                    />
                    {renderError("name")}
                </div>

                {/* Champ : Description (Pleine Largeur) */}
                <div className="col-12">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-card-text text-primary"></i> Description
                    </label>
                    <textarea
                        className="form-control px-3 py-2 rounded-3 shadow-sm"
                        name="description"
                        rows="4"
                        placeholder="Décrivez brièvement les produits associés à cette catégorie..."
                        value={formData.description}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem", resize: "none" }}
                    ></textarea>
                </div>

            </div>

            {/* Pied de page du formulaire (Boutons d'action) */}
            <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top border-light-subtle">
                <button
                    type="button"
                    className="btn btn-light border rounded-3 px-4 fw-semibold text-secondary"
                    onClick={onCancel}
                    style={{ fontSize: "0.9rem" }}
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="btn btn-primary rounded-3 px-4 fw-semibold shadow-sm"
                    style={{ fontSize: "0.9rem" }}
                >
                    {editingCategory ? (
                        <>
                            <i className="bi bi-pencil-square me-2"></i>
                            Modifier
                        </>
                    ) : (
                        <>
                            <i className="bi bi-plus-lg me-2"></i>
                            Enregistrer
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default CategoryForm;