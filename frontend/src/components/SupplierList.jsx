function SupplierList({ suppliers, onDelete, onEdit }) {

    return (

        <table className="table table-bordered table-striped mt-4">

            <thead>

                <tr>
                    <th>Nom</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Adresse</th>
                    <th>Actions</th>
                </tr>

            </thead>

            <tbody>

                {suppliers.map(supplier => (

                    <tr key={supplier.id}>

                        <td>{supplier.name}</td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.address}</td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => onEdit(supplier)}
                            >
                                Modifier
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(supplier.id)}
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

export default SupplierList;