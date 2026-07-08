import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar text-white p-3 d-flex flex-column">

            <h3 className="mb-4">
                <i className="bi bi-box-seam me-2"></i>
                Gestion Stock
            </h3>

            <hr className="border border-light opacity-50" />

            <ul className="nav flex-column">

                <li className="nav-item">

                    <NavLink
    to="/"
    className={({ isActive }) =>
        `nav-link mb-2 rounded ${
            isActive ? "bg-primary text-white" : "text-white"
        }` 
    }
>
    <i className="bi bi-speedometer2 me-2"></i>
    Tableau de bord
</NavLink>

                </li>

                <li className="nav-item">

                    <NavLink
    to="/products"
    className={({ isActive }) =>
        `nav-link mb-2 rounded ${
            isActive ? "bg-primary text-white" : "text-white"
        }`
    }
>
    <i className="bi bi-box-seam me-2 "></i>
    Produits
</NavLink>

                </li>

                <li className="nav-item">

                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            `nav-link mb-2 rounded ${
                                isActive ? "bg-primary text-white" : "text-white"
                            }`
                        }
                    >
                        <i className="bi bi-tags me-2"></i>

                        Catégories
                    </NavLink>

                </li>

                <li className="nav-item">

                    <NavLink
    to="/suppliers"
    className={({ isActive }) =>
        `nav-link mb-2 rounded ${
            isActive ? "bg-primary text-white" : "text-white"
        }`
    }
>
    <i className="bi bi-truck me-2"></i>
                                
    Fournisseurs
</NavLink>

                </li>

            </ul>
            <div className="mt-auto text-center text-secondary small">
            Version 1.0
            <br />
            © 2026 Gestion de Stock
            </div>

        </div>

    );

}

export default Sidebar;