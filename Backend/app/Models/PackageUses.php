<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageUses extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'package_id', 'details', 'count','product_count'];

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class,'id','OrderId');
    }
}
