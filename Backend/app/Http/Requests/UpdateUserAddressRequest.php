<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserAddressRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'full_name' => 'nullable',
            'country' => 'nullable',
            'address_name' => 'nullable',
            'city' => 'nullable',
            'street_address' => 'nullable',
            'town' => 'nullable',
            'state' => 'nullable',
            'postal_code' => 'nullable',
            'phone' => 'nullable',
        ];
    }

}
