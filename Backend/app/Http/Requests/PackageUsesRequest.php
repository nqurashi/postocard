<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PackageUsesRequest extends FormRequest
{

    public function rules()
    {
        return [
            'count' => 'nullable',
            'details' => 'nullable|array',
        ];
    }
}
