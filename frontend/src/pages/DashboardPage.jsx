import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

function DashboardPage() {

    const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    suppliers: 0,
    lowStock: 0,
    lowStockProducts: [],
    stockTotal: 0
});

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const response = await dashboardService.getStats();

            setStats(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div>

            <h2 className="mb-4">
                Tableau de bord
            </h2>

            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3">

                <div className="col">

                    <div className="card dashboard-card text-white bg-primary mb-3">

                        <div className="card-body">

                            <h5 className="card-title">
                    <i className="bi bi-box-seam me-2"></i>

                        <br />

                        Produits
                            </h5>

                            <h2>{stats.products}</h2>

                        </div>

                    </div>

                </div>

                <div className="col">

                    <div className="card dashboard-card text-white bg-success mb-3">

                        <div className="card-body">

                            <h5 className="card-title">
                        <i className="bi bi-tags me-2"></i>

                        <br />

                        Catégories
                            </h5>

                            <h2>{stats.categories}</h2>
                        </div>

                    </div>

                </div>

                <div className="col">

                    <div className="card dashboard-card text-white bg-warning mb-3">

                        <div className="card-body">

                            <h5 className="card-title">

                                <i className="bi bi-truck me-2"></i>

                                    <br />

                         
                            Fournisseurs
                       

                            </h5>

                            <h2>{stats.suppliers}</h2>

                        </div>

                    </div>

                </div>

                <div className="col">

                    <div className="card dashboard-card text-white bg-danger mb-3">

                        <div className="card-body">

                            <h5 className="card-title">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                    
                            <br />
                            
                            Stock Faible
                       

                            </h5>

                            <h2>{stats.lowStockProducts.length}</h2>

                        </div>

                    </div>

                </div>
                <div className=" col">

                    <div className="card dashboard-card text-white bg-info mb-3">   

                       <div className="card-body">

                            <h5 className="card-title">
                                <i className="bi bi-boxes me-2"></i>

                                <br />

                                stock Total
                                
                            </h5>


                            <h2>{stats.stockTotal}</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card mt-3">

                <div className="card-header bg-danger text-white">

                    <h5 className="mb-0">
                        ⚠ Produits en stock faible
                    </h5>

                </div>

                <div className="card-body">

                    {stats.lowStockProducts.length === 0 ? (

                        <p className="text-success">
                            Aucun produit en stock faible.
                        </p>

                    ) : (

                        <table className="table table-striped">

                            <thead>

                                <tr>
                                    <th>Produit</th>
                                    <th>Catégorie</th>
                                    <th>Fournisseur</th>
                                    <th>Stock</th>
                                    <th>Seuil</th>
                                </tr>

                            </thead>

                            <tbody>

                                {stats.lowStockProducts.map(product => (

                                    <tr key={product.id}>

                                        <td>{product.name}</td>

                                        <td>{product.category?.name}</td>

                                        <td>{product.supplier?.name}</td>

                                        <td>{product.quantity}</td>

                                        <td>{product.alert_threshold}</td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

        
        </div>
        
    );

}

export default DashboardPage;