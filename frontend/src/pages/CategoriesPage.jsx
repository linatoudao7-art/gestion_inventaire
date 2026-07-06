import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import Swal from "sweetalert2";

function CategoriesPage() {

    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
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

    const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Cette catégorie sera supprimée définitivement.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler"
    });

    if (!result.isConfirmed) return;

    try {

        await categoryService.remove(id);

        await loadCategories();

        Swal.fire({
            icon: "success",
            title: "Supprimé !",
            text: "Catégorie supprimée avec succès !",
            timer: 2000,
            showConfirmButton: false
        });

    } catch (error) {
        console.error(error);
    }

};
    const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
};
    const handleCreate = async (data) => {
    setShowForm(false);
    setEditingCategory(null);
    try {

        if (editingCategory) {

           await categoryService.update(editingCategory.id, data);          

        } else {

            await categoryService.create(data);

        }

        await loadCategories();
        Swal.fire({
        icon: "success",
        title: "Succès",
        text: editingCategory
        ? "Catégorie modifiée avec succès !"
        : "Catégorie ajoutée avec succès !",
        timer: 2000,
        showConfirmButton: false
    });
        

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
             
             <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
                Ajouter une catégorie
            </button>
            {showForm && (
            <CategoryForm
        onSubmit={handleCreate}
        editingCategory={editingCategory}
        onCancel={() => {
        setShowForm(false);
        setEditingCategory(null);
            }}
        />
            )}
            <CategoryList
            categories={categories}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />
        </div>
        

    );

}

export default CategoriesPage;