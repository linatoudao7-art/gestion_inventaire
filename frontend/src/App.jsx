import { Routes, Route, Link } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import SuppliersPage from "./pages/SuppliersPage";
import DashboardPage from "./pages/DashboardPage";
import Sidebar from "./components/Sidebar";

function App() {
    return (
    <div className="d-flex">

        <Sidebar />

        <div className="flex-grow-1 p-4">

            <Routes>

                <Route path="/" element={<DashboardPage />} />

                <Route path="/products" element={<ProductsPage />} />

                <Route path="/categories" element={<CategoriesPage />} />

                <Route path="/suppliers" element={<SuppliersPage />} />

            </Routes>

        </div>

    </div>
);
}
export default App;