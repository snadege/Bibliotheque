<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'isbn',
        'description',
        'cover_image',
        'category_id',
    ];

    // Un livre appartient à une seule catégorie
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Un livre peut être présent dans la liste de lecture de plusieurs utilisateurs
    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'book_user')->withTimestamps();
    }
}
