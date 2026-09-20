<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Book;
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
        // 1. Création des utilisateurs de test
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
        $categoriesList = [
            'Informatique',
            'Roman',
            'Science-Fiction',
            'Histoire',
            'Développement Personnel',
            'Philosophie',
        ];

        $categories = [];
        foreach ($categoriesList as $catName) {
            $categories[$catName] = Category::create([
                'label' => $catName,
                'slug'  => Str::slug($catName),
            ]);
        }

        // 3. Liste de 50 livres
        $booksData = [
            // Informatique (12 livres)
            [
                'title'       => 'Clean Code',
                'author'      => 'Robert C. Martin',
                'isbn'        => '9780132350884',
                'description' => 'Un guide inconournable pour rédiger un code propre, lisible et maintenable.',
                'cover_image' => 'https://m.media-amazon.com/images/I/41xShLch03L._SX376_BO1,204,203,200_.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'The Pragmatic Programmer',
                'author'      => 'Andrew Hunt & David Thomas',
                'isbn'        => '9780201616224',
                'description' => 'Des conseils pratiques pour devenir un développeur plus efficace au quotidien.',
                'cover_image' => 'https://m.media-amazon.com/images/I/51A8l+f83IL.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'Design Patterns',
                'author'      => 'Erich Gamma, Richard Helm, et al.',
                'isbn'        => '9780201633610',
                'description' => 'Les éléments réutilisables de la conception de logiciels orientés objet.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81gtKoapHFL.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'Refactoring',
                'author'      => 'Martin Fowler',
                'isbn'        => '9780134757599',
                'description' => 'Améliorer la conception du code existant sans modifier son comportement externe.',
                'cover_image' => 'https://m.media-amazon.com/images/I/41jB94j3CPL.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'Laravel Up & Running',
                'author'      => 'Matt Stauffer',
                'isbn'        => '9781492041214',
                'description' => 'Un guide complet pour maîtriser le framework PHP le plus populaire.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81fHIn+k9PL.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'React Key Concepts',
                'author'      => 'Maximilian Schwarzmüller',
                'isbn'        => '9781808696800',
                'description' => 'Comprendre l architecture et les concepts clés de React pour développer des interfaces modernes.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71u-7d1SItL.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'Introduction to Algorithms',
                'author'      => 'Thomas H. Cormen',
                'isbn'        => '9780262033848',
                'description' => 'La référence internationale pour l étude approfondie des algorithmes.',
                'cover_image' => 'https://m.media-amazon.com/images/I/413uE3oK-IL.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'You Dont Know JS Yet',
                'author'      => 'Kyle Simpson',
                'isbn'        => '9781098116965',
                'description' => 'Plongez au cœur des mécanismes internes de JavaScript.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71mKwR8L9BL.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'Architectures Microservices',
                'author'      => 'Sam Newman',
                'isbn'        => '9782100824106',
                'description' => 'Concevoir et déployer des systèmes distribués flexibles et scalables.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81xU2-N953L.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'Docker for Developers',
                'author'      => 'Chris Tankersley',
                'isbn'        => '9781484271872',
                'description' => 'Simplifiez le déploiement de vos applications grâce aux conteneurs Docker.',
                'cover_image' => 'https://m.media-amazon.com/images/I/712399eNl3L.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'Head First Design Patterns',
                'author'      => 'Eric Freeman',
                'isbn'        => '9781492078005',
                'description' => 'Une approche visuelle et ludique pour apprendre les patrons de conception.',
                'cover_image' => 'https://m.media-amazon.com/images/I/91InLThoM2L.jpg',
                'category_id' => $categories['Informatique']->id,
            ],
            [
                'title'       => 'System Design Interview',
                'author'      => 'Alex Xu',
                'isbn'        => '9798664653403',
                'description' => 'Un guide étape par étape pour réussir les entretiens de conception de systèmes distribués.',
                'cover_image' => 'https://m.media-amazon.com/images/I/7195P2wGOKL.jpg',
                'category_id' => $categories['Informatique']->id,
            ],

            // Roman (10 livres)
            [
                'title'       => 'L\'Étranger',
                'author'      => 'Albert Camus',
                'isbn'        => '9782070360024',
                'description' => 'Un roman classique explorant le concept d\'absurde à travers le personnage de Meursault.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81P32f4KAtL.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => 'Cent ans de solitude',
                'author'      => 'Gabriel García Márquez',
                'isbn'        => '9782020238113',
                'description' => 'L histoire monumentale de la famille Buendía dans le village imaginaire de Macondo.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81S2M-WfUvL.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => '1984',
                'author'      => 'George Orwell',
                'isbn'        => '9782070368228',
                'description' => 'Le chef-d oeuvre dystopique décrivant une société sous la surveillance constante de Big Brother.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71kxa1-0vBL.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => 'Le Petit Prince',
                'author'      => 'Antoine de Saint-Exupéry',
                'isbn'        => '9782070612758',
                'description' => 'Un conte poétique et philosophique universellement aimé.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71O2321SbhL.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => 'L\'Ombre du vent',
                'author'      => 'Carlos Ruiz Zafón',
                'isbn'        => '9782253114864',
                'description' => 'Un roman envoûtant au cœur du Cimetière des Livres Oubliés à Barcelone.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81m6K2eW0uL.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => 'Les Misérables',
                'author'      => 'Victor Hugo',
                'isbn'        => '9782070409228',
                'description' => 'Une fresque sociale magistrale qui retrace le destin de Jean Valjean.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81aM3JThT8L.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => 'Le Comte de Monte-Cristo',
                'author'      => 'Alexandre Dumas',
                'isbn'        => '9782070412822',
                'description' => 'La légendaire vengeance d Edmond Dantès après son évasion du Château d If.',
                'cover_image' => 'https://m.media-amazon.com/images/I/91P24AOn8vL.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => 'Crime et Châtiment',
                'author'      => 'Fiodor Dostoïevski',
                'isbn'        => '9782070389339',
                'description' => 'L analyse psychologique intense d un jeune étudiant confronté à la culpabilité.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81xUe53+j-L.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => 'Orgueil et Préjugés',
                'author'      => 'Jane Austen',
                'isbn'        => '9782253005889',
                'description' => 'Une comédie de mœurs brillante sur les relations entre Elizabeth Bennet et M. Darcy.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81-NfR0rA2L.jpg',
                'category_id' => $categories['Roman']->id,
            ],
            [
                'title'       => 'L\'Alchimiste',
                'author'      => 'Paulo Coelho',
                'isbn'        => '9782290004449',
                'description' => 'Le voyage initiatique d un jeune berger andalou à la recherche de sa Légende Personnelle.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg',
                'category_id' => $categories['Roman']->id,
            ],

            // Science-Fiction (10 livres)
            [
                'title'       => 'Dune',
                'author'      => 'Frank Herbert',
                'isbn'        => '9782266320485',
                'description' => 'Le monument de la science-fiction sur la planète désertique Arrakis.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81ym3vK4M2L.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Le Seigneur des Anneaux',
                'author'      => 'J.R.R. Tolkien',
                'isbn'        => '9782266283038',
                'description' => 'Une épopée fantastique majeure au cœur de la Terre du Milieu.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71jLBXtWJWL.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Fondation',
                'author'      => 'Isaac Asimov',
                'isbn'        => '9782207252819',
                'description' => 'La psychohistoire tente de réduire la période de chaos après la chute de l Empire Galactique.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71vW1X6Qn1L.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Neuromancien',
                'author'      => 'William Gibson',
                'isbn'        => '9782290006238',
                'description' => 'Le roman fondateur du genre cyberpunk au sein du Matrice.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81dG-7OFLpL.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Fahrenheit 451',
                'author'      => 'Ray Bradbury',
                'isbn'        => '9782207250280',
                'description' => 'Une société futuriste où les livres sont brûlés pour empêcher la pensée critique.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71K64-O3G4L.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Le Problème à trois corps',
                'author'      => 'Liu Cixin',
                'isbn'        => '9782253083719',
                'description' => 'Le premier contact de l humanité avec une civilisation extraterrestre hostile.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81i-M0b+TmL.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Chroniques Martiennes',
                'author'      => 'Ray Bradbury',
                'isbn'        => '9782070360819',
                'description' => 'La colonisation de la planète Mars par les êtres humains.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71y90J7CjIL.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Hyperion',
                'author'      => 'Dan Simmons',
                'isbn'        => '9782266138864',
                'description' => 'Sept pèlerins en route vers le Tombeau du Tissard sur la planète Hypérion.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81xG-Y4x6fL.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Blade Runner (Do Androids Dream...)',
                'author'      => 'Philip K. Dick',
                'isbn'        => '9782290033104',
                'description' => 'Un chasseur de primes traque des androïdes synthétiques indisciplinés.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81s4R2S-b5L.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],
            [
                'title'       => 'Le Meilleur des mondes',
                'author'      => 'Aldous Huxley',
                'isbn'        => '9782266283045',
                'description' => 'Une société future technologiquement avancée mais dénuée de liberté individuelle.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81M+3o8R70L.jpg',
                'category_id' => $categories['Science-Fiction']->id,
            ],

            // Histoire (9 livres)
            [
                'title'       => 'Sapiens : Une brève histoire de l humanité',
                'author'      => 'Yuval Noah Harari',
                'isbn'        => '9782226257017',
                'description' => 'Comment l espèce Homo Sapiens a réussi à dominer la planète Terre.',
                'cover_image' => 'https://m.media-amazon.com/images/I/713jIoMO3UL.jpg',
                'category_id' => $categories['Histoire']->id,
            ],
            [
                'title'       => 'Homo Deus',
                'author'      => 'Yuval Noah Harari',
                'isbn'        => '9782226393876',
                'description' => 'Une réflexion fascinante sur le futur de l humanité et l ère de la technologie.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71u96p2xI-L.jpg',
                'category_id' => $categories['Histoire']->id,
            ],
            [
                'title'       => 'Histoire universelle de la France',
                'author'      => 'Jules Michelet',
                'isbn'        => '9782070742111',
                'description' => 'Une vue d ensemble historique des grands moments de la civilisation française.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71R2o5-mUeL.jpg',
                'category_id' => $categories['Histoire']->id,
            ],
            [
                'title'       => 'L\'Art de la guerre',
                'author'      => 'Sun Tzu',
                'isbn'        => '9782081212886',
                'description' => 'Le traité de stratégie militaire le plus ancien et le plus célèbre au monde.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71Z+2mUfJLL.jpg',
                'category_id' => $categories['Histoire']->id,
            ],
            [
                'title'       => 'Les Piliers de la Terre',
                'author'      => 'Ken Follett',
                'isbn'        => '9782253059530',
                'description' => 'La construction d une cathédrale gothique au XIIe siècle en Angleterre.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81mXl8P6GUL.jpg',
                'category_id' => $categories['Histoire']->id,
            ],
            [
                'title'       => 'Une histoire du monde en 100 objets',
                'author'      => 'Neil MacGregor',
                'isbn'        => '9782070146031',
                'description' => 'Raconter l histoire humaine à travers des objets préservés par le British Museum.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81U2L-bU0dL.jpg',
                'category_id' => $categories['Histoire']->id,
            ],
            [
                'title'       => 'La Seconde Guerre Mondiale',
                'author'      => 'Winston Churchill',
                'isbn'        => '9782228905329',
                'description' => 'Les mémoires détaillées du Premier Ministre britannique sur le conflit mondial.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71J1U5k5QeL.jpg',
                'category_id' => $categories['Histoire']->id,
            ],
            [
                'title'       => 'Guns, Germs, and Steel',
                'author'      => 'Jared Diamond',
                'isbn'        => '9780393317558',
                'description' => 'Une étude sur les facteurs géographiques et environnementaux du progrès des civilisations.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81I-uU2oVTL.jpg',
                'category_id' => $categories['Histoire']->id,
            ],
            [
                'title'       => 'Histoire générale de l\'Afrique',
                'author'      => 'UNESCO',
                'isbn'        => '9789232017086',
                'description' => 'Un ouvrage monumental rédigé par les plus grands historiens du continent.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71qL6wP2SML.jpg',
                'category_id' => $categories['Histoire']->id,
            ],

            // Développement Personnel & Philosophie (9 livres)
            [
                'title'       => 'Atomic Habits',
                'author'      => 'James Clear',
                'isbn'        => '9780735211292',
                'description' => 'Des changements microscopiques pour obtenir des résultats remarquables.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81wgcld4wxL.jpg',
                'category_id' => $categories['Développement Personnel']->id,
            ],
            [
                'title'       => 'Les 7 Habitudes de ceux qui réussissent',
                'author'      => 'Stephen R. Covey',
                'isbn'        => '9782290032220',
                'description' => 'Un guide étape par étape pour le développement personnel et professionnel.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71XmC2oKqWL.jpg',
                'category_id' => $categories['Développement Personnel']->id,
            ],
            [
                'title'       => 'Réfléchissez et devenez riche',
                'author'      => 'Napoleon Hill',
                'isbn'        => '9782290032237',
                'description' => 'Les secrets de la réussite financière et personnelle.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71Yv8qC6AOL.jpg',
                'category_id' => $categories['Développement Personnel']->id,
            ],
            [
                'title'       => 'Deep Work',
                'author'      => 'Cal Newport',
                'isbn'        => '9781455586691',
                'description' => 'Règles pour retrouver une concentration profonde dans un monde distrait.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71G1M5O382L.jpg',
                'category_id' => $categories['Développement Personnel']->id,
            ],
            [
                'title'       => 'Père Riche, Père Pauvre',
                'author'      => 'Robert Kiyosaki',
                'isbn'        => '9782290001080',
                'description' => 'Ce que les gens riches enseignent à leurs enfants sur l argent.',
                'cover_image' => 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
                'category_id' => $categories['Développement Personnel']->id,
            ],
            [
                'title'       => 'Pensées pour moi-même',
                'author'      => 'Marc Aurèle',
                'isbn'        => '9782080700162',
                'description' => 'Les réflexions stoïciennes de l empereur romain sur la vie et la vertu.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71Kx9kM8E6L.jpg',
                'category_id' => $categories['Philosophie']->id,
            ],
            [
                'title'       => 'Ainsi parlait Zarathoustra',
                'author'      => 'Friedrich Nietzsche',
                'isbn'        => '9782070338009',
                'description' => 'Un poème philosophique majeur introduisant le concept du Surhomme.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71jQvM8G9eL.jpg',
                'category_id' => $categories['Philosophie']->id,
            ],
            [
                'title'       => 'Le Banquet',
                'author'      => 'Platon',
                'isbn'        => '9782080708892',
                'description' => 'Un dialogue philosophique classique consacré à la nature de l Amour.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71I2wM3N3eL.jpg',
                'category_id' => $categories['Philosophie']->id,
            ],
            [
                'title'       => 'Discours de la méthode',
                'author'      => 'René Descartes',
                'isbn'        => '9782080700087',
                'description' => 'Pour bien conduire sa raison et chercher la vérité dans les sciences.',
                'cover_image' => 'https://m.media-amazon.com/images/I/71R12M2R2eL.jpg',
                'category_id' => $categories['Philosophie']->id,
            ],
        ];

        // 4. Insertion des livres avec attribution aléatoire du stock
        foreach ($booksData as $book) {
            $book['available_copies'] = rand(3, 10);
            Book::create($book);
        }
    }
}