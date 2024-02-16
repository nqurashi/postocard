<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $table = 'packages';


    protected $fillable = ['user_id','name', 'package_code', 'card_count', 'package_detail', 'discount','price'];

    protected $guarded = ['id'];

    protected $casts = [
        'package_detail' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function packageUses() {
        return $this->hasMany(PackageUses::class);
    }
}
