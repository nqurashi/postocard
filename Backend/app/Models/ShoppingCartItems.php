<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCartItems extends Model
{
    use HasFactory;

    protected $table = 'ShoppingCartItems';

    protected $fillable = [ 'user_address_id',];



    /**
     * Get the Product that is connected to ShoppingCartItems
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

     public function user()
     {
         return $this->belongsTo(User::class);
     }

     public function userAddress()
     {
         return $this->belongsTo(UserAddress::class, 'user_address_id');
     }

    public function Product()
    {
        return $this->belongsTo(ProductList::class, 'id', 'Product');
    }
}
