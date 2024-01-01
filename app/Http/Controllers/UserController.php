<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        $filteredUsers = $users->reject(function ($user) {
            return $user->username === 'admin' || $user->id === Auth::id();
        });

        return Inertia::render('Admin/User', ['users' => $filteredUsers]);

    }

    public function showFormAdd()
    {
        return Inertia::render('Admin/AddUser');
    }

    public function store(Request $request) 
    {
        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        event(new Registered($user));

        return redirect()->route('pengguna.index');
    }

    public function showFormEdit(Request $request)
    {
        $user = User::find($request->id);

        return Inertia::render('Admin/EditUser', ['user' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('pengguna.index');

    }

    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return redirect()->route('pengguna.index');
    }
}