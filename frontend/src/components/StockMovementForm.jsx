import { useState } from "react";

function StockMovementForm({ onCancel, products, onSubmit }) {
    const [formData, setFormData] = useState({
        product_id: "",
        type: "",
        quantity: "",
        observation: ""
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Quantité : uniquement des chiffres
        if (name === "quantity") {
            value = value.replace(/[^0-9]/g, "");
        }

        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = {};

        if (!formData.product_id) {
            validationErrors.product_id = ["Le produit est obligatoire."];
        }

        if (!formData.type) {
            validationErrors.type = ["Le type de mouvement est obligatoire."];
        }

        if (!formData.quantity) {
            validationErrors.quantity = ["La quantité est obligatoire."];
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            setErrors(error || {});
        } finally {
            setSubmitting(false);
        }
    };

    // Fonction utilitaire pour afficher proprement les erreurs
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
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(4px)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-3 shadow-lg">
                    
                    <form onSubmit={handleSubmit} noValidate>
                        
                        {/* En-tête du Modal */}
                        <div className="modal-header border-bottom border-light-subtle py-3 px-4">
                            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2" style={{ fontSize: "1.15rem" }}>
                                <i className="bi bi-arrow-left-right text-primary fs-5"></i>
                                Nouveau mouvement
                            </h5>
                            <button
                                type="button"
                                className="btn-close shadow-none"
                                onClick={onCancel}
                                aria-label="Fermer"
                            ></button>
                        </div>

                        {/* Corps du Modal */}
                        <div className="modal-body px-4 py-4">
                            <div className="row g-3">

                                {/* Sélection du Produit */}
                                <div className="col-12">
                                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                                        <i className="bi bi-box text-primary"></i> Produit <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className={`form-select px-3 py-2.5 rounded-3 shadow-sm ${errors.product_id ? "is-invalid" : ""}`}
                                        name="product_id"
                                        value={formData.product_id}
                                        onChange={handleChange}
                                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem" }}
                                    >
                                        <option value="">Sélectionner un produit...</option>
                                        {products.map(product => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                    {renderError("product_id")}
                                </div>

                                {/* Sélection du Type de mouvement */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                                        <i className="bi bi-arrow-down-up text-primary"></i> Type <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className={`form-select px-3 py-2.5 rounded-3 shadow-sm ${errors.type ? "is-invalid" : ""}`}
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem" }}
                                    >
                                        <option value="">Choisir...</option>
                                        <option value="entry">Entrée</option>
                                        <option value="exit">Sortie</option>
                                    </select>
                                    {renderError("type")}
                                </div>

                                {/* Saisie de la Quantité */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                                        <i className="bi bi-hash text-primary"></i> Quantité <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.quantity ? "is-invalid" : ""}`}
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="Ex : 10"
                                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem" }}
                                    />
                                    {renderError("quantity")}
                                </div>

                                {/* Observations complémentaires */}
                                <div className="col-12">
                                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                                        <i className="bi bi-card-text text-primary"></i> Observation
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="form-control px-3 py-2 rounded-3 shadow-sm"
                                        name="observation"
                                        value={formData.observation}
                                        onChange={handleChange}
                                        placeholder="Note, motif de la sortie/entrée (facultatif)..."
                                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem", resize: "none" }}
                                    ></textarea>
                                </div>

                            </div>
                        </div>

                        {/* Pied de page du Modal */}
                        <div className="modal-footer border-top border-light-subtle py-3 px-4 d-flex justify-content-end gap-2">
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
                                disabled={submitting}
                                style={{ fontSize: "0.9rem" }}
                            >
                                {submitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-lg me-2"></i>
                                        Enregistrer
                                    </>
                                )}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default StockMovementForm;