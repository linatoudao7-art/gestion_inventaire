function ProductList({ products, onDelete, onEdit, onView }) {
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
    <div className="dropdown">

        <button
            className="btn btn-secondary btn-sm dropdown-toggle"
            data-bs-toggle="dropdown"
        >
            Actions
        </button>

        <ul className="dropdown-menu">

            <li>
                <button
                    className="dropdown-item"
                    onClick={() => onView(product)}
                >
                    <i className="bi bi-eye me-2"></i>
                    Voir
                </button>
            </li>

            <li>
                <button
                    className="dropdown-item"
                    onClick={() => onEdit(product)}
                >
                    <i className="bi bi-pencil me-2"></i>
                    Modifier
                </button>
            </li>

            <li>
                <button
                    className="dropdown-item text-danger"
                    onClick={() => onDelete(product.id)}
                >
                    <i className="bi bi-trash me-2"></i>
                    Supprimer
                </button>
            </li>

        </ul>

    </div>
</td>
                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default ProductList;