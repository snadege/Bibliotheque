<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ReadingListController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    
    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Gestion de la liste de lecture (Membres)
    Route::get('/my-list', [ReadingListController::class, 'index']);
    Route::post('/my-list/{bookId}', [ReadingListController::class, 'store']);
    Route::delete('/my-list/{bookId}', [ReadingListController::class, 'destroy']);

    // Gestion des livres et catégories (Espace Admin)
    Route::post('/books', [BookController::class, 'store']);
    Route::put('/books/{id}', [BookController::class, 'update']);
    Route::delete('/books/{id}', [BookController::class, 'destroy']);
    Route::post('/categories', [CategoryController::class, 'store']);
});

//Route::get('/user', function (Request $request) {
    //return $request->user();
//})->middleware('auth:sanctum');
