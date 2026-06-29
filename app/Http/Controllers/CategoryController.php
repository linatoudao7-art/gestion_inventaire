<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Afficher toutes les catégories
    public function index()
    {
        $categories = Category::all();

        return response()->json($categories, 200);
    }

    // Créer une catégorie
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return response()->json([
            'message' => 'Catégorie créée avec succès',
            'category' => $category
        ], 201);
    }

    public function show($id)
{
    $category = Category::find($id);

    if (!$category) {
        return response()->json([
            'message' => 'Catégorie introuvable'
        ], 404);
    }

    return response()->json($category);
}
    // Modifier une catégorie
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Catégorie introuvable'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return response()->json([
            'message' => 'Catégorie modifiée avec succès',
            'category' => $category
        ], 200);
    }

    // Supprimer une catégorie
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Catégorie introuvable'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'message' => 'Catégorie supprimée avec succès'
        ], 200);
    }
}