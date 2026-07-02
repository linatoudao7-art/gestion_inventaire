import { Routes, Route, Link } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import SuppliersPage from "./pages/SuppliersPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="container">

                    <Link className="navbar-brand" to="/">
                        Gestion Stock
                    </Link>

                    <div className="navbar-nav">

                        <Link className="nav-link" to="/products">
                            Produits
                        </Link>

                        <Link className="nav-link" to="/categories">
                            Catégories
                        </Link>

                        <Link className="nav-link" to="/suppliers">
                            Fournisseurs
                        </Link>

                        <Link className="nav-link" to="/dashboard">
                            Tableau de bord
                        </Link>

                    </div>

                </div>

            </nav>

            <div className="container mt-4">

                <Routes>
                    
                    <Route path="/dashboard" element={<DashboardPage />} />             
                    
                    <Route path="/products" element={<ProductsPage />} />

                    <Route path="/categories" element={<CategoriesPage />} />

                    <Route path="/suppliers" element={<SuppliersPage />} />

                </Routes>

            </div>

        </div>
    );
}

export default App;