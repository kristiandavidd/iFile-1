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

class MyFileController extends Controller
{
    public function index()
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

    public function destroy($id)
    {
        $file = File::find($id);

        Sampah::create([
            'nama_file' => $file->nama_file,
            'deskripsi' => $file->deskripsi,
            'url' => $file->url,
            'kategori' => $file->kategori,
            'jenis_file' => $file->jenis_file,
            'tgl_buang' => now(),
            'waster' => auth()->user()->id,
        ]);

        $file->delete();

        return redirect()->route('file-saya.index');
    }
}