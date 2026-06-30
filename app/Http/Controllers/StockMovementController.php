<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;

class StockMovementController extends Controller
{
    // Liste des mouvements
    public function index()
    {
        return response()->json(
            StockMovement::with('product')->latest()->get()
        );
    }

    // Créer un mouvement
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'type' => 'required|in:entry,exit',
            'quantity' => 'required|integer|min:1',
            'observation' => 'nullable|string'
        ]);

        $product = Product::findOrFail($request->product_id);

        // Vérifier le stock avant une sortie
        if (
            $request->type === 'exit' &&
            $product->quantity < $request->quantity
        ) {
            return response()->json([
                'message' => 'Stock insuffisant.'
            ], 400);
        }

        // Enregistrer le mouvement
        $movement = StockMovement::create([
            'product_id' => $request->product_id,
            'type' => $request->type,
            'quantity' => $request->quantity,
            'observation' => $request->observation
        ]);

        // Mettre à jour le stock
        if ($request->type === 'entry') {
            $product->quantity += $request->quantity;
        } else {
            $product->quantity -= $request->quantity;
        }

        $product->save();

        return response()->json([
            'message' => 'Mouvement enregistré avec succès.',
            'movement' => $movement,
            'new_stock' => $product->quantity
        ], 201);
    }
}