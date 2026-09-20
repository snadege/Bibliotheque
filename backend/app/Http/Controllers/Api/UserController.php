<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Récupérer la liste de tous les utilisateurs (Réservé aux Admin)
     */
    public function index()
    {
        $users = User::latest()->get(['id', 'name', 'email', 'role', 'created_at']);

        return response()->json([
            'status' => true,
            'data'   => $users
        ], 200);
    }

    /**
     * Mettre à jour le rôle ou les informations d'un utilisateur
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable.'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|in:admin,member',
        ]);

        $user->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Utilisateur mis à jour avec succès.',
            'data'    => $user
        ], 200);
    }

    /**
     * Supprimer un utilisateur
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable.'], 404);
        }

        // Empêcher la suppression de son propre compte admin
        if (auth()->id() == $id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas supprimer votre propre compte.'
            ], 400);
        }

        $user->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Utilisateur supprimé avec succès.'
        ], 200);
    }
}