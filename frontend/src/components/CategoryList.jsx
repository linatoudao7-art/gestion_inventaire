function CategoryList({ categories, onDelete, onEdit }) {

    return (

        <table className="table table-bordered table-striped mt-4">

            <thead>

                <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>

            </thead>

            <tbody>

                {categories.map(category => (

                    <tr key={category.id}>

                        <td>{category.name}</td>

                        <td>{category.description}</td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => onEdit(category)}
                            >
                                Modifier
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(category.id)}
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

export default CategoryList;