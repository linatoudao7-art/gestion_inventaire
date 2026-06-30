<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Supplier;
use App\Models\StockMovement;

class Product extends Model
{
    protected $fillable = [
    'name',
    'description',
    'quantity',
    'purchase_price',
    'sale_price',
    'category_id',
    'supplier_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function supplier()
    {
    return $this->belongsTo(Supplier::class);
    }
    public function stockMovements()
    {
    return $this->hasMany(StockMovement::class);
    }
}