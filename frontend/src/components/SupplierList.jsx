import "../Styles/SupplierList.css";

function SupplierList({ suppliers, onDelete, onEdit }) {

    return (

        <table
        className="table table-bordered table-striped mt-4 supplier-table"
        style={{ tableLayout: "fixed", width: "100%" }}
        >

            <thead>

                <tr>
                    <th>Nom</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Adresse</th>
                    <th style={{ width: "220px" }}>Actions</th>
                </tr>

            </thead>

            <tbody>

                {suppliers.map(supplier => (

                    <tr key={supplier.id}>

                        <td style={{ width: "180px" }}>{supplier.name}</td>
                        <td style={{ width: "180px" }}>{supplier.phone}</td>
                        <td title={supplier.email}>
                        {supplier.email && supplier.email.length > 15
                        ? supplier.email.substring(0, 15) + "..."
                        : supplier.email}
                        </td>
                        <td title={supplier.address}>
                        {supplier.address && supplier.address.length > 15
                        ? supplier.address.substring(0, 15) + "..."
                        : supplier.address}
                        </td>
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