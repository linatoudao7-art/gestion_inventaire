import { useEffect, useState } from "react";

function SupplierForm({ onSubmit, editingSupplier, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (editingSupplier) {
            setFormData({
                name: editingSupplier.name || "",
                phone: editingSupplier.phone || "",
                email: editingSupplier.email || "",
                address: editingSupplier.address || ""
            });
        } else {
            setFormData({
                name: "",
                phone: "",
                email: "",
                address: ""
            });
        }
        setErrors({});
    }, [editingSupplier]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "name") {
            value = value.replace(/[^a-zA-ZÀ-ÿ0-9\s'-]/g, "");
        }
        if (name === "phone") {
            value = value.replace(/[^0-9]/g, "");
        }
        if (name === "address") {
            value = value.replace(/[^a-zA-ZÀ-ÿ0-9\s,./'-]/g, "");
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
        
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = ["Le nom est obligatoire."];
        }
        if (!formData.phone.trim()) {
            newErrors.phone = ["Le téléphone est obligatoire."];
        }
        if (!formData.email.trim()) {
            newErrors.email = ["L'email est obligatoire."];
        }
        if (!formData.address.trim()) {
            newErrors.address = ["L'adresse est obligatoire."];
        }

        if (formData.email.trim()) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = ["Le format de l'adresse email n'est pas valide."];
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit(formData);
            if (!editingSupplier) {
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    address: ""
                });
            }
        } catch (validationErrors) {
            setErrors(validationErrors || {});
        } finally {
            setSubmitting(false);
        }
    };

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
            
            {/* Ligne 1 : Nom et Téléphone */}
            <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-building text-primary"></i> Nom <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.name ? "is-invalid" : ""}`}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nom du fournisseur"
                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem" }}
                    />
                    {renderError("name")}
                </div>

                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-telephone text-primary"></i> Téléphone <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="phone"
                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.phone ? "is-invalid" : ""}`}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ex: 70000000"
                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem" }}
                    />
                    {renderError("phone")}
                </div>
            </div>

            {/* Ligne 2 : Email et Adresse côte à côte */}
            <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-envelope text-primary"></i> Email <span className="text-danger">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control px-3 py-2.5 rounded-3 shadow-sm ${errors.email ? "is-invalid" : ""}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="fournisseur@exemple.com"
                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem" }}
                    />
                    {renderError("email")}
                </div>

                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-secondary d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.9rem" }}>
                        <i className="bi bi-geo-alt text-primary"></i> Adresse <span className="text-danger">*</span>
                    </label>
                    <textarea
                        name="address"
                        className={`form-control px-3 py-2 rounded-3 shadow-sm ${errors.address ? "is-invalid" : ""}`}
                        rows="1" // Ajusté à 1 ligne pour s'aligner parfaitement avec la hauteur de l'input d'à côté
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Adresse complète"
                        style={{ border: "1px solid #e2e8f0", fontSize: "0.95rem", resize: "none" }}
                    ></textarea>
                    {renderError("address")}
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
                    disabled={submitting}
                    style={{ fontSize: "0.9rem" }}
                >
                    {submitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Enregistrement...
                        </>
                    ) : editingSupplier ? (
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

export default SupplierForm;