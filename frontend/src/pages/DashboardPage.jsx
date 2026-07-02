import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

function DashboardPage() {

    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        suppliers: 0,
        lowStock: 0
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

            <div className="row">

                <div className="col-md-3">

                    <div className="card text-white bg-primary mb-3">

                        <div className="card-body">

                            <h5 className="card-title">
                                Produits
                            </h5>

                            <h2>
                                {stats.products}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-white bg-success mb-3">

                        <div className="card-body">

                            <h5 className="card-title">
                                Catégories
                            </h5>

                            <h2>
                                {stats.categories}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-white bg-warning mb-3">

                        <div className="card-body">

                            <h5 className="card-title">
                                Fournisseurs
                            </h5>

                            <h2>
                                {stats.suppliers}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-white bg-danger mb-3">

                        <div className="card-body">

                            <h5 className="card-title">
                                Stock faible
                            </h5>

                            <h2>
                                {stats.lowStock}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardPage;