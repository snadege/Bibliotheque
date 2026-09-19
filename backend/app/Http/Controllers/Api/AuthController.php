<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // 1. Validation des données de la requête
        $fields = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed', // Attend 'password_confirmation' dans le formulaire
        ]);

        // 2. Création du compte utilisateur
        $user = User::create([
            'name'     => $fields['name'],
            'email'    => $fields['email'],
            'password' => $fields['password'], // Le model hache automatiquement le mot de passe
            'role'     => 'member', // Rôle membre attribué par défaut
        ]);

        // 3. Génération du token d'accès Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // 4. Réponse JSON
        return response()->json([
            'message' => 'Inscription réussie',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        // 1. Validation des champs de connexion
        $fields = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        // 2. Recherche de l'utilisateur par son email
        $user = User::where('email', $fields['email'])->first();

        // 3. Vérification de l'existence et de la validité du mot de passe
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants fournis sont incorrects.'],
            ]);
        }

        // 4. Génération d'un nouveau token d'accès
        $token = $user->createToken('auth_token')->plainTextToken;

        // 5. Réponse JSON
        return response()->json([
            'message' => 'Connexion réussie',
            'user'    => $user,
            'token'   => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        // Supprime uniquement le token utilisé pour la requête courante
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ], 200);
    }
}
