import { useEffect, useState } from "react";

function SupplierForm({ onSubmit, editingSupplier }) {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (editingSupplier) {

            setFormData({
                name: editingSupplier.name,
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

    }, [editingSupplier]);

    const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    }
};

    const handleSubmit = async (e) => {

    e.preventDefault();

    const newErrors = {};

if (!formData.name.trim()) {
    newErrors.name = "Le nom est obligatoire.";
}

if (!formData.phone.trim()) {
    newErrors.phone = "Le téléphone est obligatoire.";
} else if (!/^\+[0-9]{1,3}[0-9]{6,14}$/.test(formData.phone.replace(/\s/g, ""))) {
    newErrors.phone = "Le téléphone doit commencer par l'indicatif du pays (ex: +226).";
}
if (!formData.address.trim()) {
    newErrors.address = "L'adresse est obligatoire.";
}

if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
}
    try {

        await onSubmit(formData);

        setErrors({});

        setFormData({
            name: "",
            phone: "",
            email: "",
            address: ""
        });

    } catch (errors) {

        setErrors(errors);

    }

};

    return (

        <form onSubmit={handleSubmit} className="card p-3 mb-4">

            <h4>
                {editingSupplier ? "Modifier un fournisseur" : "Ajouter un fournisseur"}
            </h4>

            <div className="mb-3">

                <label>Nom</label>

                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                {errors.name && (
                    <div className="text-danger">
                        {errors.name}
                    </div>
                )}

            </div>

            <div className="mb-3">

                <label>Téléphone</label>

                <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                {errors.phone && (
                    <div className="text-danger">
                        {errors.phone}
                    </div>
                )}

            </div>

            <div className="mb-3">

                <label>Email</label>

                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {errors.email && (
                    <div className="text-danger">
                        {errors.email}
                    </div>
                )}

            </div>

            <div className="mb-3">

                <label>Adresse</label>

                <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                {errors.address && (
            <div className="text-danger">
            {errors.address}
        </div>
        )}
            </div>

            <button className="btn btn-success">
                {editingSupplier ? "Modifier" : "Enregistrer"}
            </button>
                
        </form>

    );

}

export default SupplierForm;