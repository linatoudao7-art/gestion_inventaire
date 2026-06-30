<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    // Afficher tous les fournisseurs
    public function index()
    {
        return response()->json(Supplier::all());
    }

    // Créer un fournisseur
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string'
        ]);

        $supplier = Supplier::create($request->all());

        return response()->json([
            'message' => 'Fournisseur créé avec succès',
            'supplier' => $supplier
        ], 201);
    }

    // Afficher un fournisseur
    public function show($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'message' => 'Fournisseur introuvable'
            ], 404);
        }

        return response()->json($supplier);
    }

    // Modifier un fournisseur
    public function update(Request $request, $id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'message' => 'Fournisseur introuvable'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string'
        ]);

        $supplier->update($request->all());

        return response()->json([
            'message' => 'Fournisseur modifié avec succès',
            'supplier' => $supplier
        ]);
    }

    // Supprimer un fournisseur
    public function destroy($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'message' => 'Fournisseur introuvable'
            ], 404);
        }

        $supplier->delete();

        return response()->json([
            'message' => 'Fournisseur supprimé avec succès'
        ]);
    }
}