import { useEffect, useState } from "react";
import stockMovementService from "../services/stockMovementService";
import productService from "../services/productService";
import StockMovementList from "../components/StockMovementList";
import StockMovementForm from "../components/StockMovementForm";
import Swal from "sweetalert2";

function StockMovementsPage() {

    const [movements, setMovements] = useState([]);
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState(""); 
    const [dateFilter, setDateFilter] = useState(""); 

    useEffect(() => {
        loadMovements();
        loadProducts();
    }, []);

    const loadMovements = async () => {

        const response = await stockMovementService.getAll();

        setMovements(response.data);
    };

    const loadProducts = async () => {

        const response = await productService.getAll();

        setProducts(response.data);
    };
    const handleCreate = async (data) => {

    try {

        await stockMovementService.create(data);

        await loadMovements();
        await loadProducts();

        setShowForm(false);

        Swal.fire({
            icon: "success",
            title: "Succès",
            text: "Le mouvement de stock a été enregistré avec succès.",
            timer: 2000,
            showConfirmButton: false
        });

    } catch (error) {

        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Erreur",
            text: error.response?.data?.message || "Une erreur est survenue."
        });

    }

};
        console.log("StockMovementsPage chargé");
        
    return (

    <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

    <div className="mb-4 d-flex justify-content-start">
    <h2 className="fw-bold mb-1">
        Gestion de mouvement
    </h2>
</div>

<div className="dropdown">

    <button
    className="btn p-0 border-0 bg-transparent"
    data-bs-toggle="dropdown"
>
    <i className="bi bi-list fs-3"></i>
</button>
    <ul className="dropdown-menu dropdown-menu-end">

        <li>

            <button
                className="dropdown-item"
                onClick={() => setShowForm(true)}
            >
                <i className="bi bi-plus-circle me-2 text-primary"></i>
                Nouveau mouvement
            </button>

        </li>

    </ul>

</div>    

        </div>
        

           {showForm && (
    <StockMovementForm
        products={products}
        onSubmit={handleCreate}
        onCancel={() => setShowForm(false)}
    />
)}

       <StockMovementList
    movements={movements}
    search={search}
    setSearch={setSearch}
/>

    </div>

);
}

export default StockMovementsPage;