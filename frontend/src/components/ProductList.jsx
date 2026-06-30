function ProductList({ products }) {
    return (
        <table className="table table-bordered table-striped">

            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Stock</th>
                    <th>Statut</th>
                </tr>
            </thead>

            <tbody>

                {products.map(product => (

                    <tr key={product.id}>

                        <td>{product.name}</td>

                        <td>{product.category?.name}</td>

                        <td>{product.quantity}</td>

                        <td>{product.stock_status}</td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default ProductList;