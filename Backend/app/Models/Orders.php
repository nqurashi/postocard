<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = [ 'user_id','order_date',];

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class,'id','OrderId')->with('OrderItems');
    }

    public function carts()
    {
        return $this->hasMany(Cart::class,'id','OrderId');
    }
}
