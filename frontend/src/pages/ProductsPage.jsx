import { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import categoryService from "../services/categoryService";
import supplierService from "../services/supplierService";
import Swal from "sweetalert2";

function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    
    useEffect(() => {
    loadProducts();
    loadCategories();
    loadSuppliers();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await productService.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async (value) => {

    setSearch(value);

    try {

        if (value.trim() === "") {

            loadProducts();

        } else {

            const response = await productService.search(value);
            setProducts(response.data);

        }

    } catch (error) {
        console.error(error);
    }

    };

    const handleCreate = async (data) => {

    try {

        if (editingProduct) {

    await productService.update(editingProduct.id, data);
    setEditingProduct(null);

} else {

    await productService.create(data);

}
        await loadProducts();

    Swal.fire({
    icon: "success",
    title: "Succès",
    text: editingProduct
        ? "Produit modifié avec succès !"
        : "Produit ajouté avec succès !",
    timer: 2000,
    showConfirmButton: false
    });

    setShowForm(false);
        
        setEditingProduct(null);
    } catch (error) {

        if (error.response && error.response.status === 422) {
            throw error.response.data.errors;
        }

        throw error;
    }

};
    const loadCategories = async () => {
    try {
        const response = await categoryService.getAll();
        setCategories(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    const loadSuppliers = async () => {
    try {
        const response = await supplierService.getAll();
        setSuppliers(response.data);
       } 
       catch (error) {
    if (error.response && error.response.status === 422) {
        throw error.response.data.errors;
    }

    console.error(error);
}
    };
    const handleDelete = async (id) => {

    const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Cette action est irréversible !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler"
    });

    if (!result.isConfirmed) return;

    try {

        await productService.remove(id);

        await loadProducts();

        Swal.fire({
            icon: "success",
            title: "Supprimé !",
            text: "Le produit a été supprimé avec succès.",
            timer: 2000,
            showConfirmButton: false
        });

    } catch (error) {
        console.error(error);
    }
};
const handleCategoryFilter = async (categoryId) => {

    setSelectedCategory(categoryId);

    try {

        if (categoryId === "") {

            loadProducts();

        } else {

            const response = await productService.filterByCategory(categoryId);

            setProducts(response.data);

        }
        
    } catch (error) {
        console.error(error);
    }
    };
const handleEdit = (product) => {
    console.log(product);
    setEditingProduct(product);
    setShowForm(true);
};

const handleView = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
};

const handleExport = () => {
    window.open("http://127.0.0.1:8000/api/products/export", "_blank");
};
console.log("ProductsPage editingProduct :", editingProduct);
    return (
        <div className="container mt-4">

            <h2>Gestion des produits</h2>
            <div className="mb-3">

            <input
            type="text"
            className="form-control"
            placeholder="Rechercher un produit par son nom..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            />

        </div>
        
        <div className="mb-3">

    <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => handleCategoryFilter(e.target.value)}
    >

        <option value="">
            Toutes les catégories
        </option>

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
        
                <div className="mb-3">
        <button
        className="btn btn-primary"
        onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
        }}
    >
        <i className="bi bi-plus-circle me-2"></i>
        Ajouter un produit
        </button>
</div>
                
           {showForm && (
    <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        tabIndex="-1"
    >
        <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">
                        {editingProduct
                            ? "Modifier un produit"
                            : "Ajouter un produit"}
                    </h5>

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                            setShowForm(false);
                            setEditingProduct(null);
                        }}
                    ></button>
                </div>

                <div className="modal-body">

                    <ProductForm
                        onSubmit={handleCreate}
                        editingProduct={editingProduct}
                        categories={categories}
                        suppliers={suppliers}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingProduct(null);
                        }}
                    />

                </div>

            </div>
        </div>
    </div>
)}
            <button
            className="btn btn-success mb-3"
            onClick={handleExport}
>
            <i className="bi bi-file-earmark-excel me-2"></i>
            Exporter vers Excel
            </button>

            <ProductList
    products={products}
    onDelete={handleDelete}
    onEdit={handleEdit}
    onView={handleView}
/>
    {showDetails && (
    <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
        <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">
    <i className="bi bi-box-seam me-2 text-primary"></i>
    Détails du produit
</h5>

                    <button
                        className="btn-close"
                        onClick={() => setShowDetails(false)}
                    ></button>
                </div>

                <div className="modal-body">

    <table className="table table-borderless align-middle">

        <tbody>

            <tr>
                <th style={{ width: "30%" }}>Nom</th>
                <td>{selectedProduct.name}</td>
            </tr>

            <tr>
                <th>Description</th>
                <td>{selectedProduct.description || "-"}</td>
            </tr>

            <tr>
                <th>Catégorie</th>
                <td>{selectedProduct.category?.name}</td>
            </tr>

            <tr>
                <th>Fournisseur</th>
                <td>{selectedProduct.supplier?.name}</td>
            </tr>

            <tr>
                <th>Prix d'achat</th>
                <td>{selectedProduct.purchase_price} FCFA</td>
            </tr>

            <tr>
                <th>Prix de vente</th>
                <td>{selectedProduct.sale_price} FCFA</td>
            </tr>

            <tr>
                <th>Quantité</th>
                <td>{selectedProduct.quantity}</td>
            </tr>

            <tr>
                <th>Seuil d'alerte</th>
                <td>{selectedProduct.alert_threshold}</td>
            </tr>

            <tr>
                <th>Statut</th>

                <td>
                    {selectedProduct.stock_status === "Stock faible" ? (
                        <span className="badge bg-danger">
                            Stock faible
                        </span>
                    ) : (
                        <span className="badge bg-success">
                            Stock suffisant
                        </span>
                    )}
                </td>

            </tr>

        </tbody>

    </table>

</div>
                <div className="modal-footer">

                    <button className="btn btn-primary"
                     onClick={() => setShowDetails(false)}>
    <i className="bi bi-x-circle me-2"></i>
    Fermer
</button>
                </div>

            </div>
        </div>
    </div>
)}
        </div>
    );
}

export default ProductsPage;