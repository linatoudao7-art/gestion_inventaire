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
}
