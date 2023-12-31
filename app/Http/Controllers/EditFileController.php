<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\File;

class EditFileController extends Controller
{
    public function index()
    {
        $kategori = Kategori::all();

        return Inertia::render('EditFile', [
            'kategori' => $kategori,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_file' => 'required|string|max:100',
            'deskripsi' => 'required|string|max:300',
            'url' => 'required|string|max:100',
            'kategori' => 'required|exists:kategori,id',
            'tgl_upload' => 'required|date',
            'uploader' => 'required|exists:users,id',
        ]);

        $file = File::findOrFail($id);
        $file->update($request->all());

        return redirect()->route('files.index')->with('success', 'File berhasil diperbarui.');
    }
}