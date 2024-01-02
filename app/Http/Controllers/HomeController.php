<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;

class HomeController extends Controller
{
    public function index()
    {
        $kategori = Kategori::take(3)->get();

        return Inertia::render('Home', ['kategori'=>$kategori]);
    }

    public function indexAdmin()
    {
        $kategori = Kategori::take(3)->get();

        return Inertia::render('Admin/Home', ['kategori'=>$kategori]);
    }

}