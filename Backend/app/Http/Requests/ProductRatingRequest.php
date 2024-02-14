<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRatingRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'rating' => 'required|integer|in:1,2,3,4,5',
            'review' => 'nullable|string',
        ];
    }
}
