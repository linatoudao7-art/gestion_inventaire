import { useEffect, useState } from "react";

function CategoryForm({ onSubmit, editingCategory }) {

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (editingCategory) {

            setFormData({
                name: editingCategory.name,
                description: editingCategory.description || ""
            });

        } else {

            setFormData({
                name: "",
                description: ""
            });

        }

    }, [editingCategory]);

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

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    try {
        await onSubmit(formData);

        setErrors({});

        setFormData({
            name: "",
            description: ""
        });

    } catch (errors) {
        setErrors(errors);
    }
};


    return (
        
        <form onSubmit={handleSubmit} className="card p-3 mb-4">
            
            <h4>
                {editingCategory ? "Modifier une catégorie" : "Ajouter une catégorie"}
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

                <label>Description</label>

                <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
               
            </div>

            <button className="btn btn-success">
                {editingCategory ? "Modifier" : "Enregistrer"}
            </button>

        </form>

    );

}

export default CategoryForm;