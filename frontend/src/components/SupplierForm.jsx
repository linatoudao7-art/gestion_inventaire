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

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

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

        <form onSubmit={handleSubmit} className="mb-4">

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
                        {errors.name[0]}
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
                        {errors.phone[0]}
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
                        {errors.email[0]}
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

            </div>

            <button className="btn btn-success">
                {editingSupplier ? "Modifier" : "Enregistrer"}
            </button>
                
        </form>

    );

}

export default SupplierForm;