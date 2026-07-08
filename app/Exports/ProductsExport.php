<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ProductsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Product::with(['category', 'supplier'])
            ->get()
            ->map(function ($product) {
                return [
                    'Nom' => $product->name,
                    'Catégorie' => $product->category->name ?? '',
                    'Fournisseur' => $product->supplier->name ?? '',
                    'Quantité' => $product->quantity,
                    'Seuil d\'alerte' => $product->alert_threshold,
                    'Prix achat' => $product->purchase_price,
                    'Prix vente' => $product->sale_price,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'Nom',
            'Catégorie',
            'Fournisseur',
            'Quantité',
            'Seuil d\'alerte',
            'Prix achat',
            'Prix vente'
        ];
    }
}