<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Obtenir la liste des livres (avec option de recherche et filtre)
     */
    public function index(Request $request)
    {
        $query = Book::with('category');

        // Filtre par mot-clé (titre ou auteur)
        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
        }

        // Filtre par catégorie
        if ($request->has('category_id') && $request->category_id != '') {
            $query->where('category_id', $request->category_id);
        }

        $books = $query->latest()->get();

        return response()->json([
            'status' => true,
            'data'   => $books
        ], 200);
    }

    /**
     * Afficher les détails d'un livre spécifique
     */
    public function show($id)
    {
        $book = Book::with('category')->find($id);

        if (!$book) {
            return response()->json(['message' => 'Livre non trouvé'], 404);
        }

        return response()->json([
            'status' => true,
            'data'   => $book
        ], 200);
    }

    /**
     * Ajouter un nouveau livre (Espace Admin)
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title'       => 'required|string|max:255',
            'author'      => 'required|string|max:255',
            'isbn'        => 'required|string|unique:books,isbn',
            'description' => 'required|string',
            'cover_image' => 'nullable|string', // URL ou chemin d'image
            'category_id' => 'required|exists:categories,id',
        ]);

        $book = Book::create($fields);

        return response()->json([
            'message' => 'Livre ajouté avec succès',
            'data'    => $book
        ], 201);
    }

    /**
     * Modifier un livre existant (Espace Admin)
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Livre non trouvé'], 404);
        }

        $fields = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'author'      => 'sometimes|required|string|max:255',
            'isbn'        => 'sometimes|required|string|unique:books,isbn,' . $id,
            'description' => 'sometimes|required|string',
            'cover_image' => 'nullable|string',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        $book->update($fields);

        return response()->json([
            'message' => 'Livre mis à jour avec succès',
            'data'    => $book
        ], 200);
    }

    /**
     * Supprimer un livre (Espace Admin)
     */
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Livre non trouvé'], 404);
        }

        $book->delete();

        return response()->json([
            'message' => 'Livre supprimé avec succès'
        ], 200);
    }
}