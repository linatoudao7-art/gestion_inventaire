<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;

class DashboardController extends Controller
{
    public function stats()
{
    $lowStockProducts = Product::with('category','supplier')
        ->whereColumn('quantity', '<=', 'alert_threshold')
        ->get();

    return response()->json([
    'products' => Product::count(),
    'stockTotal' => Product::sum('quantity'),
    'categories' => Category::count(),
    'suppliers' => Supplier::count(),
    'lowStock' => $lowStockProducts->count(),
    'lowStockProducts' => $lowStockProducts
]);
}
}
