<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Exports\ProductsExport;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    // Afficher tous les produits
  public function index(Request $request)
{
    $query = Product::with(['category', 'supplier']);

    // Recherche par nom
    if ($request->filled('search')) {
        $query->where('name', 'ILIKE', '%' . $request->search . '%');
    }

    // Filtre par catégorie
    if ($request->filled('category')) {
        $query->where('category_id', $request->category);
    }

   

    $products = $query->get();

    $products->transform(function ($product) {

        $product->stock_status =
            $product->quantity <= $product->alert_threshold
                ? 'Stock faible'
                : 'Stock suffisant';

        return $product;
    });

    return response()->json($products);
}

    // Créer un produit
    public function store(Request $request)
    {
        $request->validate([
        'name.required' => 'Le nom du produit est obligatoire.',
        'quantity.required' => 'La quantité est obligatoire.',
        'purchase_price.required' => "Le prix d'achat est obligatoire.",
        'sale_price.required' => 'Le prix de vente est obligatoire.',
        'category_id.required' => 'Veuillez sélectionner une catégorie.',
        'category_id.exists' => 'La catégorie sélectionnée est invalide.',
        'supplier_id.required' => 'Veuillez sélectionner un fournisseur.',
        'supplier_id.exists' => 'Le fournisseur sélectionné est invalide.',
        'alert_threshold.required' => "Le seuil d'alerte est obligatoire.",
        'alert_threshold.min' => "Le seuil d'alerte doit être supérieur ou égal à 1."
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'purchase_price' => $request->purchase_price,
            'sale_price' => $request->sale_price,
            'category_id' => $request->category_id,
            'supplier_id' => $request->supplier_id,
            'alert_threshold' => $request->alert_threshold
        ]);

        return response()->json([
            'message' => 'Produit créé avec succès',
            'product' => $product
        ], 201);
    }
    // Afficher un produit

public function show($id)
{
    $product = Product::with(['category', 'supplier'])->find($id);

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
        'name.required' => 'Le nom du produit est obligatoire.',
        'quantity.required' => 'La quantité est obligatoire.',
        'purchase_price.required' => "Le prix d'achat est obligatoire.",
        'sale_price.required' => 'Le prix de vente est obligatoire.',
        'category_id.required' => 'Veuillez sélectionner une catégorie.',
        'category_id.exists' => 'La catégorie sélectionnée est invalide.',
        'supplier_id.required' => 'Veuillez sélectionner un fournisseur.',
        'supplier_id.exists' => 'Le fournisseur sélectionné est invalide.',
        'alert_threshold.required' => "Le seuil d'alerte est obligatoire.",
        'alert_threshold.min' => "Le seuil d'alerte doit être supérieur ou égal à 1."
    ]);

    $product->update([
        'name' => $request->name,
        'description' => $request->description,
        'quantity' => $request->quantity,
        'purchase_price' => $request->purchase_price,
        'sale_price' => $request->sale_price,
        'category_id' => $request->category_id,
        'supplier_id' => $request->supplier_id,
        'alert_threshold' => $request->alert_threshold
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
public function export()
{
    return Excel::download(new ProductsExport, 'produits.xlsx');
}
}
