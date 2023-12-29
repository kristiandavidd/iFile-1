<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
    ])->name('home');
});

Route::inertia('/', 'Home')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/eksplor', function () {
        return Inertia::render('Explore');
    });
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');
    Route::get('/sampah', function () {
        return Inertia::render('Sampah');
    });
    Route::get('/file-saya', function() {
        return Inertia::render('MyFile');
    });
});

Route::get('/images/{filename}', function ($filename) {
    return response()->file(public_path("images/{$filename}"));
})->where('filename', '.*');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('admin/dashboard', fn() => inertia('Admin/Dashboard'))->name('admin.dashboard');
    Route::get('admin', function () {
        return redirect()->route('admin.dashboard');
    });
});

// Route::middleware(['auth'])->group(function () {
    //     Route::get('/', fn() => inertia('Home'))->name('home');
    //     // other user routes...
    // });
    
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});


require __DIR__.'/auth.php';
