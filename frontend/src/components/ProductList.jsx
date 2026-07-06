function ProductList({ products, onDelete, onEdit }) {
    return (
        <table className="table table-bordered table-striped">

            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Stock</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>

                {products.map(product => (

                    <tr
                key={product.id}
                className={
                product.stock_status === "Stock faible"
                ? "table-danger"
                : ""
    }
>

                        <td>{product.name}</td>

                        <td>{product.category?.name}</td>

                        <td>{product.quantity}</td>

                        <td>
                            {product.stock_status === "Stock faible" ? (
                    <span className="badge bg-danger">
                    Stock faible
                    </span>
                    ) : (
                    <span className="badge bg-success">
                    Stock suffisant
                    </span>
                    )}
                        </td>
                        <td>
                    <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {
                console.log(product);
                onEdit(product);
                }}
                    >
                        Modifier
                    </button>
 
                <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(product.id)}
                >
                Supprimer
                </button>

                        </td>
                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default ProductList;