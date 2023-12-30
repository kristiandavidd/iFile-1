<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        $kategori = Kategori::all();

        return Inertia::render('AddFile', [
            'kategori' => $kategori,
        ]);
    }
}
