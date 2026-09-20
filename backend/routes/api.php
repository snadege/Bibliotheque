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
    Route::get('/my-list', [ReadingListController::class, 'index']);
    Route::post('/my-list/{bookId}', [ReadingListController::class, 'store']);
    Route::delete('/my-list/{bookId}', [ReadingListController::class, 'destroy']);

    // Routes POST complémentaires pour prendre en charge l'emprunt depuis le frontend
    Route::post('/borrowings', [ReadingListController::class, 'store']);
    Route::post('/borrowings/{bookId}', [ReadingListController::class, 'store']);

    // --- ESPACE ADMIN ---
    // Dashboard Stats & Historique Global des Emprunts
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::get('/borrowings', [ReadingListController::class, 'adminIndex']); // Historique global pour React Admin

    // Gestion des Utilisateurs (Supporte à la fois /users et /admin/users selon l'appel de React)
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Gestion CRUD des Livres (Admin)
    Route::post('/books', [BookController::class, 'store']);
    Route::put('/books/{id}', [BookController::class, 'update']);
    Route::delete('/books/{id}', [BookController::class, 'destroy']);

    // Gestion CRUD des Catégories (Admin)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    
});