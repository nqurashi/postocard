<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'guard_name'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    const ADMIN = 'admin';
    const EMPLOYE = 'employe';
    const USER = 'user';
    const PERMANENT_ROLES = [self::ADMIN, self::EMPLOYE, self::USER];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('role_not_permanent', function (Builder $builder) {
            $builder->whereNotIn('name', self::PERMANENT_ROLES);
        });

        self::creating(function ($model) {
            $model->guard_name = 'web';
        });
    }

    public function scopeActive($query)
    {
        return $query->where('status', '=', 'active');
    }
}
