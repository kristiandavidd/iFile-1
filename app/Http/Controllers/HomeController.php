<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;
use App\Models\Mahasiswa;

class HomeController extends Controller
{
    public function index()
    {
        $kategori = Kategori::all();
        $mahasiswa = Mahasiswa::all();

        return Inertia::render('Home', ['kategori'=>$kategori, 'mahasiswaData'=>$mahasiswa]);
    }

    public function indexAdmin()
    {
        $kategori = Kategori::all();

        return Inertia::render('Admin/Home', ['kategori'=>$kategori]);
    }

}