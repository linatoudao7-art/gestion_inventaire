<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Afficher tous les produits
    public function index()
    {
        $products = Product::with('category')->get();

        return response()->json($products);
    }

    // Créer un produit
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
            'purchase_price' => 'required|numeric',
            'sale_price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id'
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'purchase_price' => $request->purchase_price,
            'sale_price' => $request->sale_price,
            'category_id' => $request->category_id
        ]);

        return response()->json([
            'message' => 'Produit créé avec succès',
            'product' => $product
        ], 201);
    }
    // Afficher un produit
public function show($id)
{
    $product = Product::with('category')->find($id);

    if (!$product) {
        return response()->json([
            'message' => 'Produit introuvable'
        ], 404);
    }

    return response()->json($product);
}

// Modifier un produit
public function update(Request $request, $id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json([
            'message' => 'Produit introuvable'
        ], 404);
    }

    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'quantity' => 'required|integer',
        'purchase_price' => 'required|numeric',
        'sale_price' => 'required|numeric',
        'category_id' => 'required|exists:categories,id'
    ]);

    $product->update([
        'name' => $request->name,
        'description' => $request->description,
        'quantity' => $request->quantity,
        'purchase_price' => $request->purchase_price,
        'sale_price' => $request->sale_price,
        'category_id' => $request->category_id
    ]);

    return response()->json([
        'message' => 'Produit modifié avec succès',
        'product' => $product
    ]);
}

// Supprimer un produit
public function destroy($id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json([
            'message' => 'Produit introuvable'
        ], 404);
    }

    $product->delete();

    return response()->json([
        'message' => 'Produit supprimé avec succès'
    ]);
}
}
