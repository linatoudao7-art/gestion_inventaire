import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div 
            className="sidebar p-4 d-flex flex-column justify-content-between" 
            style={{ 
                backgroundColor: "#111315", 
                width: "260px", 
                minHeight: "100vh",
                fontFamily: "sans-serif"
            }}
        >
            {/* SECTION DU HAUT */}
            <div>
                {/* Logo / Titre */}
                <h4 className="text-white d-flex align-items-center gap-2 mb-4 px-2 py-1">
                    <i className="bi bi-box-seam text-secondary"></i>
                    <span className="fw-semibold" style={{ fontSize: "1.1rem", letterSpacing: "0.5px" }}>
                        Gestion Stock
                    </span>
                </h4>

                {/* Navigation */}
                <ul className="nav flex-column gap-1">
                    {/* Tableau de bord */}
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded transition ${
                                    isActive
                                        ? "bg-primary text-white fw-medium"
                                        : "text-secondary hover-dark"
                                }` 
                            }
                            style={({ isActive }) => isActive ? {} : { color: "#8a8d93" }}
                        >
                            <i className="bi bi-speedometer2 fs-5"></i>
                            <span>Tableau de bord</span>
                        </NavLink>
                    </li>

                    {/* Produits */}
                    <li className="nav-item">
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded transition ${
                                    isActive
                                        ? "bg-primary text-white fw-medium"
                                        : "text-secondary hover-dark"
                                }`
                            }
                            style={({ isActive }) => isActive ? {} : { color: "#8a8d93" }}
                        >
                            <i className="bi bi-box-seam fs-5"></i>
                            <span>Produits</span>
                        </NavLink>
                    </li>

                    {/* Catégories */}
                    <li className="nav-item">
                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded transition ${
                                    isActive
                                        ? "bg-primary text-white fw-medium"
                                        : "text-secondary hover-dark"
                                }`
                            }
                            style={({ isActive }) => isActive ? {} : { color: "#8a8d93" }}
                        >
                            <i className="bi bi-tags fs-5"></i>
                            <span>Catégories</span>
                        </NavLink>
                    </li>

                    {/* Fournisseurs */}
                    <li className="nav-item">
                        <NavLink
                            to="/suppliers"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded transition ${
                                    isActive
                                        ? "bg-primary text-white fw-medium"
                                        : "text-secondary hover-dark"
                                }`
                            }
                            style={({ isActive }) => isActive ? {} : { color: "#8a8d93" }}
                        >
                            <i className="bi bi-truck fs-5"></i>
                            <span>Fournisseurs</span>
                        </NavLink>
                    </li>

                    {/* Stock Mouvement */}
                    <li className="nav-item">
                        <NavLink
                            to="/stock-movement"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded transition ${
                                    isActive
                                        ? "bg-primary text-white fw-medium"
                                        : "text-secondary hover-dark"
                                }`
                            }
                            style={({ isActive }) => isActive ? {} : { color: "#8a8d93" }}
                        >
                            <i className="bi bi-arrow-left-right fs-5"></i>
                            <span>StockMouvement</span>
                        </NavLink>
                    </li>

                    {/* Inventaire */}
                    <li className="nav-item">
                        <NavLink
                            to="/inventory"
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded transition ${
                                    isActive
                                        ? "bg-primary text-white fw-medium"
                                        : "text-secondary hover-dark"
                                }`
                            }
                            style={({ isActive }) => isActive ? {} : { color: "#8a8d93" }}
                        >
                            <i className="bi bi-clipboard-data fs-5"></i>
                            <span>Inventaire</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* SECTION DU BAS (Footer) */}
            <div className="text-center pt-3" style={{ fontSize: "11px", color: "#53565d" }}>
                <div>Version 1.0</div>
                <div className="mt-1">© 2026 Gestion de Stock</div>
            </div>
        </div>
    );
}

export default Sidebar;