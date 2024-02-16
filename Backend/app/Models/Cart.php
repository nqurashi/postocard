<?php

namespace App\Models;

use App\Models\CartItems;
use App\Models\Orders;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    protected $fillable = [ 'UserID','order_date','OrderId', 'amount'];

    protected $table = "ShoppingCart";



    /**
     * Get all of the Items for the Cart
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Items()
    {
        return $this->hasMany(CartItems::class,'CartID','id')->with('Vendor');
    }

    public function OrderItems()
    {
        return $this->hasMany(CartItems::class,'CartID','id')->with(['Address','ProductDetails']);
    }

    /**
     * Get the Order associated with the Cart
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function Order()
    {
        return $this->hasOne(Orders::class, 'id', 'OrderId');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'CartID','id');
    }

    public function packageUses()
    {
        return $this->hasOne(PackageUses::class,'CartID','id');
    }

    public function transaction()
    {
        return $this->hasOne(Transaction::class,'id');
    }
}
