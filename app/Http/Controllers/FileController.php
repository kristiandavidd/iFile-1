<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use App\Models\Kategori;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FileController extends Controller
{
    // Menampilkan semua file
    public function index()
    {
        $files = File::all();
        
        Log::info($files);
        // dd($files);

        return Inertia::render('Home', [
            'files' => $files,
        ]);
    }

    // Menampilkan form untuk menambahkan file baru
    public function create()
    {
        $kategori = Kategori::all();
        return view('files.create', compact('kategori'));
    }

    // Menyimpan file baru ke dalam database
    public function store(Request $request)
    {
        $request->validate([
            'nama_file' => 'required|string|max:100',
            'deskripsi' => 'required|string|max:300',
            'url' => 'required|string|max:100',
            'kategori' => 'required|exists:kategori,id',
            'tgl_upload' => 'required|date',
            'uploader' => 'required|exists:users,id', // Sesuaikan dengan model User jika diperlukan
        ]);

        File::create($request->all());

        return redirect()->route('files.index')->with('success', 'File berhasil ditambahkan.');
    }

    // Menampilkan detail suatu file
    public function show($id)
    {
        $file = File::findOrFail($id);
        return view('files.show', compact('file'));
    }

    // Menampilkan form untuk mengedit file
    public function edit($id)
    {
        $file = File::findOrFail($id);
        $kategori = Kategori::all();
        return view('files.edit', compact('file', 'kategori'));
    }

    // Menyimpan perubahan pada file ke dalam database
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_file' => 'required|string|max:100',
            'deskripsi' => 'required|string|max:300',
            'url' => 'required|string|max:100',
            'kategori' => 'required|exists:kategori,id',
            'tgl_upload' => 'required|date',
            'uploader' => 'required|exists:users,id', // Sesuaikan dengan model User jika diperlukan
        ]);

        $file = File::findOrFail($id);
        $file->update($request->all());

        return redirect()->route('files.index')->with('success', 'File berhasil diperbarui.');
    }

    // Menghapus file dari database
    public function destroy($id)
    {
        $file = File::findOrFail($id);
        $file->delete();

        return redirect()->route('files.index')->with('success', 'File berhasil dihapus.');
    }
}
