<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function stats()
    {
        // 1. Total des livres
        $totalBooks = Book::count();

        // 2. Total des emprunts (enregistrements dans la table pivot book_user)
        $totalBorrowings = DB::table('book_user')->count();

        // 3. Emprunts en cours (égal au total car la table pivot représente les emprunts actifs)
        $activeBorrowings = $totalBorrowings;

        // 4. Nombre de membres inscrits (rôle 'member')
        $totalUsers = User::where('role', 'member')->count();

        // Fallback si aucun utilisateur n'a explicitement le rôle 'member'
        if ($totalUsers === 0) {
            $totalUsers = User::where('role', '!=', 'admin')->count();
        }

        // 5. Livres les plus populaires (compte la relation favoritedBy sous le nom reading_lists_count)
        $popularBooks = Book::with('category')
            ->withCount('favoritedBy as reading_lists_count')
            ->orderBy('reading_lists_count', 'desc')
            ->take(5)
            ->get();

        // 6. Derniers membres inscrits (uniquement les membres)
        $latestUsers = User::where('role', '!=', 'admin')
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'created_at']);

        return response()->json([
            'status' => true,
            'data' => [
                'total_books'       => $totalBooks,
                'active_borrowings' => $activeBorrowings,
                'total_borrowings'  => $totalBorrowings,
                'total_users'       => $totalUsers,
                'popular_books'     => $popularBooks,
                'latest_users'      => $latestUsers,
            ]
        ], 200);
    }
}