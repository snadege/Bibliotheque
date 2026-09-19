<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'status' => true,
            'data'   => $categories
        ], 200);
    }

    /**
     * Ajouter une nouvelle catégorie (Espace Admin)
     */
    public function store(Request $request)
    {
        // 1. Validation des données envoyées
        $fields = $request->validate([
            'label' => 'required|string|max:100|unique:categories,label',
        ]);

        // 2. Création de la catégorie avec génération automatique du slug
        $category = Category::create([
            'label' => $fields['label'],
            'slug'  => Str::slug($fields['label']), // Ex: "Science Fiction" -> "science-fiction"
        ]);

        return response()->json([
            'message' => 'Catégorie créée avec succès',
            'data'    => $category
        ], 201);
    }
}
