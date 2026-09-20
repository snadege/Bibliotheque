<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class ReadingListController extends Controller
{
    /**
     * "Mes Emprunts" : Récupérer UNIQUEMENT les emprunts de l'utilisateur connecté
     * (Accessible à tous les utilisateurs authentifiés, y compris Admin)
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Non authentifié.'], 401);
        }

        // On récupère uniquement les livres associés à cet utilisateur
        $borrowings = $user->books()->with('category')->get();

        return response()->json([
            'status' => true,
            'data'   => $borrowings
        ], 200);
    }

    /**
     * "Gestion Globale des Emprunts" : Reservé à l'Admin dans le Dashboard
     */
    public function adminIndex(Request $request)
    {
        $user = $request->user();

        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Accès non autorisé.'], 403);
        }

        $borrowings = DB::table('book_user')
            ->join('users', 'book_user.user_id', '=', 'users.id')
            ->join('books', 'book_user.book_id', '=', 'books.id')
            ->select(
                'book_user.id',
                'book_user.created_at',
                'users.name as user_name',
                'books.title as book_title'
            )
            ->latest('book_user.created_at')
            ->get()
            ->map(function ($item) {
                return [
                    'id'         => $item->id,
                    'created_at' => $item->created_at,
                    'user'       => ['name' => $item->user_name],
                    'book'       => ['title' => $item->book_title],
                ];
            });

        return response()->json([
            'status' => true,
            'data'   => $borrowings
        ], 200);
    }

    /**
     * Emprunter un livre
     */
    public function store(Request $request, $bookId = null)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
        }

        $id = $bookId ?? $request->input('book_id');

        if (!$id) {
            return response()->json(['message' => 'ID du livre non spécifié.'], 400);
        }

        if ($user->books()->where('book_id', $id)->exists()) {
            return response()->json([
                'message' => 'Vous avez déjà emprunté cet ouvrage.'
            ], 400);
        }

        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Livre introuvable.'], 404);
        }

        if (($book->available_copies ?? 1) <= 0) {
            return response()->json([
                'message' => 'Cet ouvrage n\'est plus disponible pour le moment.'
            ], 400);
        }

        $user->books()->attach($id);

        if (isset($book->available_copies)) {
            $book->decrement('available_copies');
        }

        return response()->json([
            'message' => 'Livre emprunté avec succès !',
            'book'    => $book->fresh()
        ], 201);
    }

    /**
     * Rendre un livre
     */
    public function destroy(Request $request, $bookId = null)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
        }

        $id = $bookId ?? $request->input('book_id');

        if (!$id) {
            return response()->json(['message' => 'ID du livre non spécifié.'], 400);
        }

        if ($user->books()->where('book_id', $id)->exists()) {
            $user->books()->detach($id);

            $book = Book::find($id);
            if ($book && isset($book->available_copies)) {
                $book->increment('available_copies');
            }

            return response()->json([
                'message' => 'Livre rendu avec succès.'
            ], 200);
        }

        return response()->json([
            'message' => 'Ce livre ne figure pas dans vos emprunts.'
        ], 404);
    }
}