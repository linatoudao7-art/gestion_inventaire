import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";

function CategoriesPage() {

    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    useEffect(() => {
        loadCategories();
    }, []);
    const loadCategories = async () => {

        try {

            const response = await categoryService.getAll();

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        }

    };
    const handleDelete = async (id) => {

    const confirmation = window.confirm(
        "Voulez-vous vraiment supprimer cette catégorie ?"
    );

    if (!confirmation) {
        return;
    }

    try {

        await categoryService.remove(id);

        await loadCategories();

    } catch (error) {
        console.error(error);
    }

};

    const handleEdit = (category) => {
    setEditingCategory(category);
};
    const handleCreate = async (data) => {

    try {

        if (editingCategory) {

            const confirmation = window.confirm(
                "Voulez-vous vraiment modifier cette catégorie ?"
            );

            if (!confirmation) {
                return;
            }

            await categoryService.update(editingCategory.id, data);

            setEditingCategory(null);

        } else {

            await categoryService.create(data);

        }

        await loadCategories();

    } catch (error) {

        if (error.response && error.response.status === 422) {
            throw error.response.data.errors;
        }

        throw error;
    }

};
    return (

        <div className="container mt-4">

            <h2>Gestion des catégories</h2>
             <CategoryForm
            onSubmit={handleCreate}
            editingCategory={editingCategory}
            />
            <CategoryList
            categories={categories}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />
        </div>
        

    );

}

export default CategoriesPage;