import { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import categoryService from "../services/categoryService";
import supplierService from "../services/supplierService";

function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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

    const confirmation = window.confirm(
        "Voulez-vous vraiment modifier ce produit ?"
    );

    if (!confirmation) {
        return;
    }

    await productService.update(editingProduct.id, data);

    setEditingProduct(null);

} else {

    await productService.create(data);

}
        await loadProducts();

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

    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
        return;
    }

    try {

        await productService.remove(id);

        loadProducts();

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
            <ProductForm
            onSubmit={handleCreate}
            editingProduct={editingProduct}
            categories={categories}
            suppliers={suppliers}
            />

            <ProductList
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />

        </div>
    );
}

export default ProductsPage;