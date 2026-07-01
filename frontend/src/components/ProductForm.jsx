import { useState, useEffect } from "react";

function ProductForm({
    onSubmit,
    categories,
    suppliers,
    editingProduct
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

        <form onSubmit={handleSubmit} className="card p-3 mb-4">

            <h4>
    {editingProduct ? "Modifier un produit" : "Ajouter un produit"}
            </h4>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label>Nom</label>
                    <input
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label>Description</label>
                    <input
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label>Prix d'achat</label>
                    <input
                        type="number"
                        className="form-control"
                        name="purchase_price"
                        value={formData.purchase_price}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label>Prix de vente</label>
                    <input
                        type="number"
                        className="form-control"
                        name="sale_price"
                        value={formData.sale_price}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label>Quantité</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label>Seuil d'alerte</label>
                    <input
                        type="number"
                        className="form-control"
                        name="alert_threshold"
                        value={formData.alert_threshold}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4 mb-3">
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
                </div>

                <div className="col-md-4 mb-3">
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
                        
                </div>

            </div>

            <button className="btn btn-success">
                {editingProduct ? "Modifier" : "Ajouter"}
            </button>

        </form>

    );
}

export default ProductForm;