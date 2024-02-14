<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','full_name', 'country', 'address_name', 'street_address', 'city', 'town', 'state', 'postal_code', 'phone','is_enabled'];

    protected $guarded = ['id'];

    public function getRouteKeyName()
    {
        return 'id';
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function shoppingCartItems()
    {
        return $this->hasMany(ShoppingCartItems::class, 'user_address_id');
    }
}
