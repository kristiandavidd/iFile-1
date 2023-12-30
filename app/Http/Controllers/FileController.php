<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use App\Models\Kategori;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Sampah;

class FileController extends Controller
{
    
    public function index()
    {
        $files = File::with(['kategori', 'uploader'])->get();
        $userRole = 'uploader';

        $files->transform(function ($file) use($userRole) {
            $file->formattedDate = Carbon::createFromFormat('Y-m-d', $file->tgl_upload)->format('d M Y');
            $file->userRole = $userRole;
            return $file;
        });

        return Inertia::render('Eksplor', ['files' => $files]);
    }

    public function indexMyFile()
    {
        $userId = Auth::id();

        $files = File::where('uploader', $userId)->with(['kategori', 'uploader'])->get();
        $userRole = 'uploader';

        $files->transform(function ($file) use($userRole) {
            $file->formattedDate = Carbon::createFromFormat('Y-m-d', $file->tgl_upload)->format('d M Y');
            $file->userRole = $userRole;
            return $file;
        });

        return Inertia::render('MyFile', ['files' => $files]);
    }

    public function indexSampah()
    {
        $userId = Auth::id();

        $trashes= Sampah::where('waster', $userId)->with(['kategori', 'waster'])->get();
        $userRole = 'waster';

        $trashes->transform(function ($trash) use ($userRole) {
            $trash->formattedDate = Carbon::createFromFormat('Y-m-d', $trash->tgl_buang)->format('d M Y');
            $trash->userRole = $userRole;
            return $trash;
        });

        return Inertia::render('Sampah', ['files' => $trashes]);
    }

    public function create()
    {
        $kategori = Kategori::all();
        return view('files.create', compact('kategori'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_file' => 'required|string|max:100',
            'deskripsi' => 'required|string|max:300',
            'url' => 'required|string|max:100',
            'kategori' => 'required|exists:kategori,id',
            'tgl_upload' => 'required|date',
            'uploader' => 'required|exists:users,id',
        ]);

        File::create($request->all());

        return redirect()->route('files.index')->with('success', 'File berhasil ditambahkan.');
    }

    public function show($id)
    {
        $file = File::findOrFail($id);
        return view('files.show', compact('file'));
    }

    public function edit($id)
    {
        $file = File::findOrFail($id);
        $kategori = Kategori::all();
        return view('files.edit', compact('file', 'kategori'));
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

    public function destroy($id)
    {
        $file = File::findOrFail($id);
        $file->delete();

        return redirect()->route('files.index')->with('success', 'File berhasil dihapus.');
    }
}
