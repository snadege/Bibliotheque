<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ReadingListController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\UserController;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

// Routes protégées par authentification Sanctum
Route::middleware('auth:sanctum')->group(function () {
    
    // Déconnexion & Utilisateur courant
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // --- ESPACE MEMBRE : Mes Emprunts personnels ---
    // Aligné sur MyList.jsx (GET /borrowings renvoie les emprunts du membre connecté)
    Route::get('/borrowings', [ReadingListController::class, 'index']);
    Route::get('/my-list', [ReadingListController::class, 'index']);

    // Emprunter un livre (supporte POST /borrowings avec body { book_id: x })
    Route::post('/borrowings', [ReadingListController::class, 'store']);
    Route::post('/borrowings/{bookId}', [ReadingListController::class, 'store']);
    Route::post('/my-list/{bookId}', [ReadingListController::class, 'store']);

    // Rendre un livre (DELETE /my-list/{bookId} ou DELETE /borrowings/{bookId})
    Route::delete('/my-list/{bookId}', [ReadingListController::class, 'destroy']);
    Route::delete('/borrowings/{bookId}', [ReadingListController::class, 'destroy']);

    // --- ESPACE ADMIN ---
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::get('/admin/borrowings', [ReadingListController::class, 'adminIndex']); // Historique global décalé sur /admin/borrowings

    // Gestion des Utilisateurs
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Gestion CRUD des Livres
    Route::post('/books', [BookController::class, 'store']);
    Route::put('/books/{id}', [BookController::class, 'update']);
    Route::delete('/books/{id}', [BookController::class, 'destroy']);

    // Gestion CRUD des Catégories
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    
});