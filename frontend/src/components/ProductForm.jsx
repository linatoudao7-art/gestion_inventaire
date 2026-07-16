import { useState, useEffect } from "react";

function ProductForm({
    onSubmit,
    categories,
    suppliers,
    editingProduct,
    onCancel
}) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        purchase_price: "",
        sale_price: "",
        category_id: "",
        supplier_id: "",
        alert_threshold: ""
    });
    
    const [errors, setErrors] = useState({});

    // Synchronisation avec le produit en cours d'édition
    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name || "",
                description: editingProduct.description || "",
                quantity: editingProduct.quantity ?? "",
                purchase_price: editingProduct.purchase_price ?? "",
                sale_price: editingProduct.sale_price ?? "",
                alert_threshold: editingProduct.alert_threshold ?? "",
                category_id: editingProduct.category_id || "",
                supplier_id: editingProduct.supplier_id || ""
            });
        } else {
            setFormData({
                name: "",
                description: "",
                purchase_price: "",
                sale_price: "",
                alert_threshold: "",
                category_id: "",
                supplier_id: ""
            });
        }
        setErrors({});
    }, [editingProduct]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Validation et nettoyage dynamique à la saisie
        if (name === "name") {
            value = value.replace(/[^a-zA-ZÀ-ÿ0-9\s'-]/g, "");
        }
        if (
            name === "quantity" ||
            name === "purchase_price" ||
            name === "sale_price" ||
            name === "alert_threshold"
        ) {
            value = value.replace(/[^0-9]/g, "");
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        // Validations côté client
        if (!formData.name.trim()) {
            validationErrors.name = ["Le nom est obligatoire."];
        }
        if (!formData.purchase_price) {
            validationErrors.purchase_price = ["Le prix d'achat est obligatoire."];
        }
        if (!formData.sale_price) {
            validationErrors.sale_price = ["Le prix de vente est obligatoire."];
        }
        if (!formData.alert_threshold) {
            validationErrors.alert_threshold = ["Le seuil d'alerte est obligatoire."];
        }
        if (!formData.category_id) {
            validationErrors.category_id = ["La catégorie est obligatoire."];
        }
        if (!formData.supplier_id) {
            validationErrors.supplier_id = ["Le fournisseur est obligatoire."];
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await onSubmit(formData);
            setErrors({});
            
            // Reset seulement si on n'est pas en train d'éditer
            if (!editingProduct) {
                setFormData({
                    name: "",
                    description: "",
                    purchase_price: "",
                    sale_price: "",
                    alert_threshold: "",
                    category_id: "",
                    supplier_id: ""
                });
            }
        } catch (apiErrors) {
            setErrors(apiErrors);
        }
    };

    // Fonction utilitaire pour afficher proprement les erreurs sous les champs
    const renderError = (field) => {
        if (!errors[field]) return null;
        const message = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
        return <div className="text-danger small mt-1 fw-medium">{message}</div>;
    };

    return (
        <form onSubmit={handleSubmit} className="px-2">
            <div className="row g-3">
                
                {/* Ligne 1 : Nom */}
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-box text-primary"></i> Nom <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.name ? "is-invalid" : ""}`}
                        name="name"
                        placeholder="Ex: Ordinateur portable"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0" }}
                    />
                    {renderError("name")}
                </div>

                {/* Ligne 1 : Catégorie */}
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-tags text-primary"></i> Catégorie <span className="text-danger">*</span>
                    </label>
                    <select
                        className={`form-select px-3 py-2.5 rounded-3 shadow-sm ${errors.category_id ? "is-invalid" : ""}`}
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0", cursor: "pointer" }}
                    >
                        <option value="">Choisir une catégorie...</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {renderError("category_id")}
                </div>
                    
                {/* Ligne 2 : Fournisseur */}
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-building text-primary"></i> Fournisseur <span className="text-danger">*</span>
                    </label>
                    <select
                        className={`form-select px-3 py-2.5 rounded-3 shadow-sm ${errors.supplier_id ? "is-invalid" : ""}`}
                        name="supplier_id"
                        value={formData.supplier_id}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0", cursor: "pointer" }}
                    >
                        <option value="">Choisir un fournisseur...</option>
                        {suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                    {renderError("supplier_id")}
                </div>

                {/* Ligne 2 : Seuil d'alerte */}
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-exclamation-circle text-primary"></i> Seuil d'alerte <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        min="0"
                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.alert_threshold ? "is-invalid" : ""}`}
                        name="alert_threshold"
                        placeholder="Ex: 3"
                        value={formData.alert_threshold}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0" }}
                    />
                    {renderError("alert_threshold")}
                </div>

                {/* Ligne 3 : Prix d'achat */}
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-cash-stack text-primary"></i> Prix d'achat <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        min="0"
                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.purchase_price ? "is-invalid" : ""}`}
                        name="purchase_price"
                        placeholder="0.00"
                        value={formData.purchase_price}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0" }}
                    />
                    {renderError("purchase_price")}
                </div>

                {/* Ligne 3 : Prix de vente */}
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-currency-dollar text-primary"></i> Prix de vente <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        min="0"
                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.sale_price ? "is-invalid" : ""}`}
                        name="sale_price"
                        placeholder="0.00"
                        value={formData.sale_price}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0" }}
                    />
                    {renderError("sale_price")}
                </div>

                {/* Ligne 4 : Description (En Pleine Largeur) */}
                <div className="col-12">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-card-text text-primary"></i> Description
                    </label>
                    <textarea
                        className={`form-control px-3 py-2 rounded-3 shadow-sm ${errors.description ? "is-invalid" : ""}`}
                        name="description"
                        rows="3"
                        placeholder="Description facultative"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ border: "1px solid #e2e8f0" }}
                    ></textarea>
                    {renderError("description")}
                </div>

                {/* Gestion masquée ou rendu de l'erreur de quantité si nécessaire */}
                {errors.quantity && (
                    <div className="col-12">
                        {renderError("quantity")}
                    </div>
                )}
                
            </div>

            {/* Boutons d'action du formulaire */}
            <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top border-light-subtle">
                <button
                    type="button"
                    className="btn btn-light border rounded-3 px-4 fw-semibold text-secondary"
                    onClick={onCancel}
                >
                    Annuler
                </button>

                <button type="submit" className="btn btn-primary rounded-3 px-4 fw-semibold shadow-sm">
                    {editingProduct ? "Modifier" : "Enregistrer"}
                </button>
            </div>
        </form>
    );
}

export default ProductForm;