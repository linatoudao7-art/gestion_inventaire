import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";
import "../Styles/dashboard.css";

function DashboardPage() {

    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        suppliers: 0,
        lowStock: 0,
        lowStockProducts: [],
        stockTotal: 0,
        stockValue: 0,
        outOfStock: 0,
        lastMovements: []
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

    // Fonction pour formater proprement l'argent en FCFA
    const formatFCFA = (value) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div>
        <div className="mb-4 d-flex justify-content-start">
    <h2 className="fw-bold mb-1">
        Tableau de bord
    </h2>
</div>
            <div className="row g-4">
                {/* Produits */}
                <div className="col-lg-4 col-md-6">
                    <div className="dashboard-card h-100">
                        <div className="card-body text-center">
                            <div className="dashboard-header d-flex align-items-center justify-content-center gap-2 mb-2">
                                <i className="bi bi-box-seam dashboard-icon text-primary fs-4"></i>
                                <span className="dashboard-title fw-semibold">Produits</span>
                            </div>
                            <h2 className="dashboard-value fw-bold mt-2">
                                {stats.products}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Catégories */}
                <div className="col-lg-4 col-md-6">
                    <div className="dashboard-card h-100">
                        <div className="card-body text-center">
                            <div className="dashboard-header d-flex align-items-center justify-content-center gap-2 mb-2">
                                <i className="bi bi-tags dashboard-icon text-success fs-4"></i>
                                <span className="dashboard-title fw-semibold">Catégories</span>
                            </div>
                            <h2 className="dashboard-value fw-bold mt-2">
                                {stats.categories}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Fournisseurs */}
                <div className="col-lg-4 col-md-6">
                    <div className="dashboard-card h-100">
                        <div className="card-body text-center">
                            <div className="dashboard-header d-flex align-items-center justify-content-center gap-2 mb-2">
                                <i className="bi bi-truck dashboard-icon text-warning fs-4"></i>
                                <span className="dashboard-title fw-semibold">Fournisseurs</span>
                            </div>
                            <h2 className="dashboard-value fw-bold mt-2">
                                {stats.suppliers}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Stock Faible */}
                <div className="col-lg-4 col-md-6">
                    <div className="dashboard-card h-100">
                        <div className="card-body text-center">
                            <div className="dashboard-header d-flex align-items-center justify-content-center gap-2 mb-2">
                                <i className="bi bi-exclamation-triangle dashboard-icon text-danger fs-4"></i>
                                <span className="dashboard-title fw-semibold">Stock faible</span>
                            </div>
                            <h2 className="dashboard-value fw-bold mt-2">
                                {stats.lowStockProducts.length}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Stock Total */}
                <div className="col-lg-4 col-md-6">
                    <div className="dashboard-card h-100">
                        <div className="card-body text-center">
                            <div className="dashboard-header d-flex align-items-center justify-content-center gap-2 mb-2">
                                <i className="bi bi-boxes dashboard-icon text-info fs-4"></i>
                                <span className="dashboard-title fw-semibold">Stock total</span>
                            </div>
                            <h2 className="dashboard-value fw-bold mt-2">
                                {stats.stockTotal}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Valeur Stock */}
                <div className="col-lg-4 col-md-6">
                    <div className="dashboard-card h-100">
                        <div className="card-body text-center">
                            <div className="dashboard-header d-flex align-items-center justify-content-center gap-2 mb-2">
                                <i className="bi bi-cash-stack dashboard-icon text-success fs-4"></i>
                                <span className="dashboard-title fw-semibold">Valeur stock</span>
                            </div>
                            {/* fs-3 garantit que le texte reste bien proportionné sur une seule ligne */}
                            <h3 className="dashboard-value fw-bold mt-2 fs-3 text-dark">
                                {formatFCFA(stats.stockValue)} <span className="fs-5 fw-semibold text-muted">FCFA</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Ruptures */}
                <div className="col-lg-4 col-md-6">
                    <div className="dashboard-card h-100">
                        <div className="card-body text-center">
                            <div className="dashboard-header d-flex align-items-center justify-content-center gap-2 mb-2">
                                <i className="bi bi-x-octagon dashboard-icon text-danger fs-4"></i>
                                <span className="dashboard-title fw-semibold">Ruptures</span>
                            </div>
                            <h2 className="dashboard-value fw-bold mt-2">
                                {stats.outOfStock}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tableau Produits en stock faible */}
            <div className="card shadow-sm border-0 rounded-4 mt-4">
                <div className="card-header bg-white border-0 pt-4 px-4">
                    <h4 className="fw-bold text-dark d-flex align-items-center gap-2">
                        <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                        Produits en stock faible
                    </h4>
                </div>
                <div className="card-body">
                    {stats.lowStockProducts.length === 0 ? (
                        <p className="text-success fw-medium px-2">
                            Aucun produit en stock faible.
                        </p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table align-middle table-hover">
                                <thead className="table-light">
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
                                            <td className="fw-semibold">{product.name}</td>
                                            <td>{product.category?.name}</td>
                                            <td>{product.supplier?.name}</td>
                                            <td>
                                                <span className="badge bg-danger rounded-pill px-3 py-2">
                                                    {product.quantity}
                                                </span>
                                            </td>
                                            <td>{product.alert_threshold}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Tableau Derniers Mouvements */}
            <div className="card shadow-sm border-0 rounded-4 mt-4 mb-4">
                <div className="card-header bg-white border-0 pt-4 px-4">
                    <h4 className="fw-bold text-dark d-flex align-items-center gap-2">
                        <i className="bi bi-clock-history text-primary"></i>
                        Derniers mouvements
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table align-middle table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Date</th>
                                    <th>Produit</th>
                                    <th>Type</th>
                                    <th>Quantité</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.lastMovements.map(movement => (
                                    <tr key={movement.id}>
                                        <td>
                                            {new Date(movement.created_at).toLocaleDateString("fr-FR")}
                                        </td>
                                        <td className="fw-semibold">
                                            {movement.product?.name}
                                        </td>
                                        <td>
                                            {movement.type === "entry" ? (
                                                <span className="badge bg-success-subtle text-success border border-success rounded-pill px-3 py-1">
                                                    Entrée
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger-subtle text-danger border border-danger rounded-pill px-3 py-1">
                                                    Sortie
                                                </span>
                                            )}
                                        </td>
                                        <td className="fw-semibold">{movement.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;