<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Champs autorisés pour l'insertion en masse
    protected $fillable = ['label', 'slug'];

    // Relation : Une catégorie possède plusieurs livres
    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
