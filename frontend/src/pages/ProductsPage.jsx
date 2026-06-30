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

    const handleCreate = async (data) => {

    try {

        await productService.create(data);

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
    return (
        <div className="container mt-4">

            <h2>Gestion des produits</h2>

            <ProductForm
            onSubmit={handleCreate}
            categories={categories}
            suppliers={suppliers}
        />

            <ProductList products={products} />

        </div>
    );
}

export default ProductsPage;