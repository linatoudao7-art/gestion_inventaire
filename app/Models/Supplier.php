<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Supplier extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'address'
    ];
    public function products()
{
    return $this->hasMany(Product::class);
}
}