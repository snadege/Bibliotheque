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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'label' => $validated['label'],
            'slug'  => Str::slug($validated['label']),
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Catégorie créée avec succès.',
            'data'    => $category
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Catégorie introuvable.'], 404);
        }

        $validated = $request->validate([
            'label' => 'required|string|max:255',
        ]);

        $category->update([
            'label' => $validated['label'],
            'slug'  => Str::slug($validated['label']),
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Catégorie mise à jour avec succès.',
            'data'    => $category
        ], 200);
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Catégorie introuvable.'], 404);
        }

        $category->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Catégorie supprimée avec succès.'
        ], 200);
    }
}