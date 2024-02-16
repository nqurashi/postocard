<?php

namespace App\Http\Requests\Auth;

use App\Traits\ResponseMethodTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ResetPasswordRequest extends FormRequest
{
    use ResponseMethodTrait;

    public function rules(): array
    {
        return [
            'password' => 'required|string|confirmed',
        ];
    }
}
