<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\Cart;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = ['user_id', 'ProductCount', 'order_created_date', 'amount','order_id','OrderId'];

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order(): hasMany {

        return $this->hasMany(Orders::class);
    }

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class, 'id');
    }
}
