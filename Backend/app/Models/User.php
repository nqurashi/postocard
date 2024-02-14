<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\UserAddress;
use App\Models\package;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active',
        'role',
        'payment_method',
        'spending',
        'current_package',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    protected $guarded = ['id'];

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function hasRole($role)
    {
        return $this->role === $role;
    }

    public function assignRole($role)
    {
        $this->update(['role' => $role]);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function addresses()
    {
        return $this->hasMany(UserAddress::class, 'user_id');
    }

    public function userAddress()
    {

    return $this->hasMany(UserAddress::class);

    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function shoppingCartItems()
    {
        return $this->hasMany(ShoppingCartItems::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function packages()
    {
        return $this->hasMany(Package::class);
    }

    public function productRatings()
    {
        return $this->hasMany(ProductRating::class, 'user_id');
    }

    public function packageUses()
    {
        return $this->hasMany(PackageUses::class);
    }
}
