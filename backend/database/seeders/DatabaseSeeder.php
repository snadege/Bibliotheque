<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Book;
//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::create([
            'name'     => 'Admin Biblio',
            'email'    => 'admin@biblio.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        $member = User::create([
            'name'     => 'Membre Test',
            'email'    => 'member@biblio.com',
            'password' => Hash::make('password'),
            'role'     => 'member',
        ]);

        // 2. Création des catégories
        $categories = [
            'Informatique',
            'Roman',
            'Science-Fiction',
            'Histoire',
        ];

        $createdCategories = [];
        foreach ($categories as $catName) {
            $createdCategories[$catName] = Category::create([
                'label' => $catName,
                'slug'  => Str::slug($catName),
            ]);
        }

        // 3. Création des livres de démonstration
        $books = [
            [
                'title'       => 'Clean Code',
                'author'      => 'Robert C. Martin',
                'isbn'        => '9780132350884',
                'description' => 'Un guide incontournable pour rédiger un code propre et maintenable.',
                'cover_image' => 'https://m.media-amazon.com/images/I/41xShLch03L._SX376_BO1,204,203,200_.jpg',
                'category_id' => $createdCategories['Informatique']->id,
            ],
            [
                'title'       => 'Le Seigneur des Anneaux',
                'author'      => 'J.R.R. Tolkien',
                'isbn'        => '9782266283038',
                'description' => 'Une épopée fantastique majeure au cœur de la Terre du Milieu.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71jLBXtWJWL.jpg',
                'category_id' => $createdCategories['Science-Fiction']->id,
            ],
            [
                'title'       => 'L\'Étranger',
                'author'      => 'Albert Camus',
                'isbn'        => '9782070360024',
                'description' => 'Un roman classique explorant le concept d\'absurde.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81P32f4KAtL.jpg',
                'category_id' => $createdCategories['Roman']->id,
            ],
        ];

        foreach ($books as $bookData) {
            Book::create($bookData);
        }
    }
}
