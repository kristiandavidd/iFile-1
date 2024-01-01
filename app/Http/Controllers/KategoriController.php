<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;

class KategoriController extends Controller
{
    public function index()
    {
        $kategori = Kategori::all();

        return Inertia::render('Admin/Kategori', ['kategori'=>$kategori]);
    }

    public function showFormAdd()
    {
        return Inertia::render('Admin/AddKategori');
    }

    public function store(Request $request) 
    {
        $newKategori = new Kategori([
            'kategori' => $request->input('kategori'),
            'keterangan' => $request->input('keterangan'),
        ]);

        $newKategori->save();   

        return redirect()->route('kategori.index');
    }

    public function showFormEdit(Request $request)
    {
        $kategori = Kategori::findOrFail($request->id);

        return Inertia::render('Admin/EditKategori', ['kategori'=>$kategori]);
    }

    public function update(Request $request, $id)
    {
        $kategori = Kategori::findOrFail($id);

        $kategori->update([
            'kategori' => $request->input('kategori'),
            'keterangan' => $request->input('keterangan'),
        ]);

        return redirect()->route('kategori.index');
    }

    public function destroy(Request $request, $id)
    {
        $kategori = Kategori::findOrFail($id);

        $kategori->delete();

        return redirect()->route('kategori.index');
    }
}
