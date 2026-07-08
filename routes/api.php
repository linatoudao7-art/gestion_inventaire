<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\DashboardController;

Route::get('/products/export', [ProductController::class, 'export']);

// CRUD API
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('suppliers', SupplierController::class);

// Dashboard stats
Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

// Mouvements de stock
Route::get('/stock-movements', [StockMovementController::class, 'index']);
Route::post('/stock-movements', [StockMovementController::class, 'store']);