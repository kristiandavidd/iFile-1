<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class File extends Model
{
    use HasFactory;

    protected $table = 'file';

    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_file',
        'deskripsi',
        'url',
        'kategori',
        'tgl_upload',
        'uploader',
    ];

    public $timestamps = false; 

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori');
    }

}
