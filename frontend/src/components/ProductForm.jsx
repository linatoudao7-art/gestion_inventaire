import { useState, useEffect } from "react";

function ProductForm({
    onSubmit,
    categories,
    suppliers,
    editingProduct,
    onCancel
})  {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        quantity: "",
        purchase_price: "",
        sale_price: "",
        alert_threshold: "",
        category_id: "",
        supplier_id: ""
    });
    console.log("editingProduct :", editingProduct);
    useEffect(() => {

    if (editingProduct) {

        setFormData({
            name: editingProduct.name,
            description: editingProduct.description || "",
            quantity: editingProduct.quantity,
            purchase_price: editingProduct.purchase_price,
            sale_price: editingProduct.sale_price,
            alert_threshold: editingProduct.alert_threshold,
            category_id: editingProduct.category_id,
            supplier_id: editingProduct.supplier_id || ""
        });

    } else {

        setFormData({
            name: "",
            description: "",
            quantity: "",
            purchase_price: "",
            sale_price: "",
            alert_threshold: "",
            category_id: "",
            supplier_id: ""
        });

    }

}, [editingProduct]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

if (!formData.name.trim()) {
    validationErrors.name = ["Le nom est obligatoire."];
}

if (!formData.quantity) {
    validationErrors.quantity = ["La quantité est obligatoire."];
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

    setFormData({
        name: "",
        description: "",
        quantity: "",
        purchase_price: "",
        sale_price: "",
        alert_threshold: "",
        category_id: "",
        supplier_id: ""
    });

} catch (errors) {
    setErrors(errors);
}

    };
    const [errors, setErrors] = useState({});

    return (

        <form onSubmit={handleSubmit}>
            
            <div className="row">

                <div className="col-md-6 mb-3">
                    <label>Nom</label>
                    <input
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
                <div className="col-md-6 mb-3">
                    <label>Catégorie</label>

                    <select
                        className="form-select"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        <option value="">Choisir...</option>

                        {categories.map(category => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>
                    {errors.category_id && (
                        <div className="text-danger">
                            {errors.category_id[0]}
                        </div>
                    )}
                </div>
                    
                    <div className="col-md-6 mb-3">
                    <label>Fournisseur</label>

                    <select
                        className="form-select"
                        name="supplier_id"
                        value={formData.supplier_id}
                        onChange={handleChange}
                    >
                        <option value="">Choisir...</option>

                        {suppliers.map(supplier => (

                            <option
                                key={supplier.id}
                                value={supplier.id}
                            >
                                {supplier.name}
                            </option>

                        ))}

                    </select>
                    {errors.supplier_id && (
                        <div className="text-danger">
                            {errors.supplier_id[0]}
                        </div>
                    )}
                </div>


                <div className="col-md-6 mb-3">
                    <label>Description</label>
                    <input
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {errors.description && (
                        <div className="text-danger">
                            {errors.description[0]}
                        </div>
                    )}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Prix d'achat</label>
                    <input
                        type="number"
                        className="form-control"
                        name="purchase_price"
                        value={formData.purchase_price}
                        onChange={handleChange}
                    />
                    {errors.purchase_price && (
                        <div className="text-danger">
                            {errors.purchase_price[0]}
                        </div>
                    )}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Prix de vente</label>
                    <input
                        type="number"
                        className="form-control"
                        name="sale_price"
                        value={formData.sale_price}
                        onChange={handleChange}
                    />
                    {errors.sale_price && (
                        <div className="text-danger">
                            {errors.sale_price[0]}
                        </div>
                    )}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Quantité</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    {errors.quantity && (
                        <div className="text-danger">
                            {errors.quantity[0]}
                        </div>
                    )}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Seuil d'alerte</label>
                    <input
                        type="number"
                        className="form-control"
                        name="alert_threshold"
                        value={formData.alert_threshold}
                        onChange={handleChange}
                    />
                    {errors.alert_threshold && (
                        <div className="text-danger">
                            {errors.alert_threshold[0]}
                        </div>
                    )}
                </div>
                
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">

    <button
        type="button"
        className="btn btn-secondary"
        onClick={onCancel}
    >
        Annuler
    </button>

    <button className="btn btn-success">
        {editingProduct ? "Modifier" : "Enregistrer"}
    </button>

</div>
            
        </form>

    );
}

export default ProductForm;