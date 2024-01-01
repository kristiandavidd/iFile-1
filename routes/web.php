<?php

use App\Http\Controllers\AddFileController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\EditFileController;
use App\Http\Controllers\EksplorController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\MyFileController;
use App\Http\Controllers\AdminSampahController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MySampahController;

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

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Home');
    })->name('admin');
    Route::get('/file', [FileController::class, 'index'])->name('file.index');
    Route::get('/sampah', [AdminSampahController::class, 'index'])->name('sampah.index');
    Route::get('/sampah/{id}', [AdminSampahController::class, 'destroy'])->name('delete-permanen');
    Route::get('/kategori', [KategoriController::class, 'index'])->name('kategori.index');
    Route::post('/tambah-kategori', [KategoriController::class, 'store'])->name('tambah-kategori.store');
    Route::get('/tambah-kategori', [KategoriController::class, 'showFormAdd'])->name('tambah-kategori');
    Route::post('/edit-kategori/{id}', [KategoriController::class, 'update'])->name('edit-kategori.update');
    Route::match(['get', 'post'],'/edit-kategori', [KategoriController::class, 'showFormEdit'])->name('edit-kategori');
    Route::get('/delete-kategori/{id}', [KategoriController::class, 'destroy'])->name('delete-kategori');
    Route::get('/pengguna', [UserController::class, 'index'])->name('pengguna.index');
    Route::post('/tambah-user', [UserController::class, 'store'])->name('tambah-user.store');
    Route::get('/tambah-pengguna', [UserController::class, 'showFormAdd'])->name('tambah-user');
    Route::post('/edit-user/{id}', [UserController::class, 'update'])->name('edit-user.update');
    Route::match(['get', 'post'],'/edit-user', [UserController::class, 'showFormEdit'])->name('edit-user');
    Route::get('/delete-user/{id}', [UserController::class, 'destroy'])->name('delete-user');
});

Route::middleware(['auth','regular_user'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');
    Route::get('/eksplor', [EksplorController::class, 'index'])->name('eksplor.index');
    Route::get('/file-saya', [MyFileController::class, 'index'])->name('file-saya.index');
    Route::get('/sampah', [MySampahController::class, 'index'])->name('sampah-saya.index');
});

Route::middleware(['auth'])->group(function() {
    Route::post('/tambah-file', [AddFileController::class, 'store'])->name('tambah-file.store');
    Route::get('/tambah-file', [AddFileController::class, 'index'])->name('tambah-file');
    Route::post('/edit-file/{id}', [EditFileController::class, 'update'])->name('edit-file.update');
    Route::match(['get', 'post'],'/edit-file', [EditFileController::class, 'index'])->name('edit-file');
    Route::get('/delete-file/{id}', [MyFileController::class, 'destroy'])->name('delete-file');
    Route::get('/restore-file/{id}', [MySampahController::class, 'restore'])->name('restore-file');
});

Route::get('/images/{filename}', function ($filename) {
    return response()->file(public_path("images/{$filename}"));
})->where('filename', '.*');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

require __DIR__.'/auth.php';
