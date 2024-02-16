<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Vendors extends Model
{
    use Notifiable, HasApiTokens;

    protected $fillable = [
        'VendorName', 'Address', 'Rate', 'Email', 'BankAccountNo', 'ContactNumber', 'password','api_token'
    ];

    protected $table = 'Vendors';

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getAuthIdentifierName()
    {
        return 'Email';
    }

    public function getAuthPassword()
    {
        return $this->password;
    }
}
