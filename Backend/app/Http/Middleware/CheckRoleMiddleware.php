<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        $user = auth()->user();

        if ($user && ($user->hasRole($role) || $user->isAdmin())) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
