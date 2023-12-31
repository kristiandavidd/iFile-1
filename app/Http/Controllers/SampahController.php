<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sampah;
use App\Models\Kategori;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class SampahController extends Controller
{
    public function index()
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
}