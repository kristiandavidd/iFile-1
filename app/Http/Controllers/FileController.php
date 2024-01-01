<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\File;

class FileController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $files = File::where('uploader', $userId)->with(['kategori', 'uploader'])->get();
        $userRole = 'uploader';

        $files->transform(function ($file) use ($userRole) {
            $file->formattedDate = Carbon::createFromFormat('Y-m-d', $file->tgl_upload)->format('d M Y');
            $file->userRole = $userRole;
            return $file;
        });

        return Inertia::render('Admin/File', ['files' => $files]);
    }
}