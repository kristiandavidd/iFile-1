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

    public function show($angkatan) {
        $mahasiswa = Mahasiswa::where('angkatan', $angkatan)->get();
        $kategori = Kategori::all();
        return Inertia::render('ShowDetail', ['kategori'=>$kategori,'mahasiswa'=>$mahasiswa, 'angkatan'=>$angkatan]);
    }

    public function updateStatus(Request $request, $nim) {
    
    $mahasiswa = Mahasiswa::find($nim);
    $status = $request->input('status');


    $mahasiswa->status = $status;
    $mahasiswa->save();

    return redirect()->back();
}
}