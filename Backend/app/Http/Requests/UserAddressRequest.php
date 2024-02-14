<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAddressRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'full_name' => 'required',
            'country' => 'required',
            'address_name' => 'required',
            'street_address' => 'required',
            'city' => 'required',
            'town' => 'required',
            'state' => 'required',
            'postal_code' => 'required',
            'phone' => 'required',
        ];
    }
}
