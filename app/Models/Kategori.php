<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $table = 'nama_tabel_kategori';

    protected $primaryKey = 'id'; 

    protected $fillable = [
        'kategori',
        'keterangan',
    ];

    public $timestamps = false; 

}
