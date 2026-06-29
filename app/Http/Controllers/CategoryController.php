<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|max:255',
        'description' => 'nullable'
    ]);

    $category = Category::create([
        'name' => $request->name,
        'description' => $request->description
    ]);

    return response()->json($category, 201);
}
}