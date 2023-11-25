<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

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
        'canRegister' => Route::has('register'),
    ]);
});

Route::inertia('/', 'Home')->name('home');

Route::middleware(['auth'])->group(function () {
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


Route::get('/login', fn() => inertia('Auth/Login'))->name('login');
Route::post('/login', [AuthController::class, 'login']);

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
