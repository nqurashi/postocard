<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\Vendors;
use App\Models\UserAddress;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CartItems extends Model
{
    use HasFactory;


    protected $table = "ShoppingCartItems";



    /**
     * Get the Product that owns the CartItems
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function ProductDetails()
    {
        return $this->belongsTo(ProductList::class, 'Product', 'id');
    }
    /**
     * Get the user associated with the CartItems
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function Vendor()
    {
        return $this->hasOne(Vendors::class, 'id', 'AssignedVendor');
    }


    public function Address()
    {
        return $this->hasOne(UserAddress::class, 'id', 'user_address_id');
    }

}
