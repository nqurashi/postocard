<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PackageRequest extends FormRequest
{

    public function rules()
    {
        return [
            'name'           => 'required|string|max:255',
            'card_count'     => 'required|integer',
            'package_detail' => 'required|array',
            'discount'       => 'required|numeric|between:0,100',
            'price'          => 'required|numeric',
        ];
    }

}
