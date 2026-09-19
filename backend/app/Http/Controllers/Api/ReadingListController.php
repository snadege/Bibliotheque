<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class ReadingListController extends Controller
{
    /**
     * Récupérer la liste de lecture de l'utilisateur connecté
     */
    public function index(Request $request)
    {
        // Récupère les livres liés à l'utilisateur authentifié
        $myList = $request->user()->books()->with('category')->get();

        return response()->json([
            'status' => true,
            'data'   => $myList
        ], 200);
    }

    /**
     * Ajouter un livre à sa liste de lecture
     */
    public function store(Request $request, $bookId)
    {
        $book = Book::find($bookId);

        if (!$book) {
            return response()->json(['message' => 'Livre introuvable'], 404);
        }

        // Attache le livre s'il n'est pas déjà présent dans la liste
        $request->user()->books()->syncWithoutDetaching([$bookId]);

        return response()->json([
            'message' => 'Livre ajouté à votre liste de lecture'
        ], 200);
    }

    /**
     * Retirer un livre de sa liste de lecture
     */
    public function destroy(Request $request, $bookId)
    {
        // Detach supprime la ligne correspondante dans la table pivot book_user
        $request->user()->books()->detach($bookId);

        return response()->json([
            'message' => 'Livre retiré de votre liste de lecture'
        ], 200);
    }
}