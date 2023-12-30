<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\KategoriController;

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


// web.php


Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        ])->name('home');
    });
    
Route::inertia('/', 'Home')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');
    Route::get('/eksplor', [FileController::class, 'index'])->name('eksplor.index');
    Route::get('/file-saya', [FileController::class, 'indexMyFile'])->name('file-saya.index');
    Route::post('/tambah-file', [FileController::class, 'store'])->name('tambah-file.store');
    Route::get('/tambah-file', [KategoriController::class, 'index'])->name('tambah-file');
    Route::get('/sampah', [FileController::class, 'indexSampah'])->name('sampah.index');
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
    
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});



require __DIR__.'/auth.php';
