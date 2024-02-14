<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordCustomRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class ResetPasswordController extends Controller
{
    public function reset(ResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                ])->save();

                $user->tokens()->delete();
            }
        );

        return match ($status) {
            Password::PASSWORD_RESET => $this->sendResponse([], 'Password Resets Successfully'),
            Password::INVALID_TOKEN => $this->sendError('Invalid Token.'),
            default => $this->sendError($this->serverErrorMessage()),
        };
    }

    public function resetPassword(ResetPasswordCustomRequest $request)
    {
        $user = $request->user();

        $user->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        return $this->sendResponse([], 'Password Resets Successfully');
    }
}
