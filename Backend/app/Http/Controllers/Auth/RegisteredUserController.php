<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Response;

class RegisteredUserController extends Controller
{

    public function store(RegisterRequest $request)
{
    $existingUser = User::where('email', $request->email)->first();

    if ($existingUser) {
        return response()->json(['message' => 'Email already exists.'], Response::HTTP_BAD_REQUEST);
    }

    $role = $this->determineRole($request);

    $imageName = $request->hasFile('image') ? time() . '.' . $request->file('image')->extension() : 'default.jpg';

    if ($request->hasFile('image')) {
        $request->file('image')->move(public_path('user_images'), $imageName);
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'image' => $imageName,
        'role' => $role,
    ]);

    Auth::login($user);

    $user->update(['already_login' => true]);

    $response['user'] = new UserResource($user);
    $response['token'] = $user->createToken('Auth Token')->plainTextToken;

    return response()->json(['result' => $response, 'message' => 'User registered successfully'], Response::HTTP_OK);
}

private function determineRole($request)
{
    if ($request->IsAdmin) {
        return Role::ADMIN;
    } elseif ($request->IsEmploye) {
        return Role::EMPLOYE;
    } else {
        return Role::USER;
    }
}
}
