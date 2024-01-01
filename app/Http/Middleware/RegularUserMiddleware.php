<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class RegularUserMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the authenticated user is a regular user (not admin)
        if (auth()->check() && !auth()->user()->isAdmin()) {
            return $next($request);
        }

        // Redirect admin users to a suitable route
        return redirect()->route('admin')->with('error', 'Unauthorized access.');
    }
}
