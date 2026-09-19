import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Badge, Button, Spinner } from 'react-bootstrap';
import { Search, BookOpen, Tag, Sparkles, Clock, ShieldCheck, Brain, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import images2 from '../assets/images2.jpeg';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksRes, categoriesRes] = await Promise.all([
        API.get('/books'),
        API.get('/categories')
      ]);

      const booksData = Array.isArray(booksRes.data) ? booksRes.data : (booksRes.data?.data || []);
      const categoriesData = Array.isArray(categoriesRes.data) ? categoriesRes.data : (categoriesRes.data?.data || []);

      setBooks(booksData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setBooks([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = Array.isArray(books) 
    ? books.filter((book) => {
        const matchesSearch = 
          (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === '' || book.category_id === parseInt(selectedCategory);
        return matchesSearch && matchesCategory;
      })
    : [];

  return (
    <div>
      {/* HERO SECTION EN VERT */}
      <div 
        className="position-relative text-white py-5 mb-5"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1920&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '420px'
        }}
      >
        <Container className="py-5">
          <Row className="justify-content-center text-center">
            <Col lg={9}>
              <Badge bg="success" className="px-3 py-2 fs-6 rounded-pill mb-3 text-uppercase tracking-wide">
                <Sparkles size={14} className="me-1" /> Votre Bibliothèque Numérique
              </Badge>
              <h1 className="display-4 fw-bold mb-3">
                L'Univers du Savoir à Portée de Clic
              </h1>
              <p className="lead text-light mb-4 opacity-90 fs-5">
                Accédez instantanément à des milliers d'ouvrages, gérez vos emprunts en toute simplicité et plongez dans une expérience de lecture moderne et fluide.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="#catalogue" className="btn btn-success btn-lg px-4 gap-2 d-inline-flex align-items-center">
                  <BookOpen size={20} /> Explorer le Catalogue
                </a>
                <Link to="/register" className="btn btn-outline-light btn-lg px-4">
                  Rejoindre la Communauté
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 1. Section Inspiration & Épanouissement */}
        <section className="py-5 bg-white">
        <Container>
            <Row className="align-items-center gy-4">
            <Col lg={6}>
                <div className="pe-lg-3">
                <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill mb-3">
                    <Sparkles size={16} className="me-1" /> Cultivez votre esprit
                </span>
                <h2 className="fw-bold text-dark display-6 mb-3">
                    La lecture, un voyage vers l'épanouissement et la réussite
                </h2>
                <p className="text-muted fs-6 mb-3">
                    Lire ne consiste pas seulement à parcourir des mots : c'est ouvrir une porte vers la connaissance, 
                    stimuler sa créativité et développer un esprit critique indispensable. 
                </p>
                <p className="text-muted fs-6 mb-4">
                    Que ce soit pour réussir vos études, enrichir votre culture générale ou booster votre développement 
                    personnel, la régularité de la lecture façonne les leaders et les innovateurs de demain.
                </p>

                <Row className="g-3">
                    <Col sm={6}>
                    <div className="d-flex align-items-center gap-3 p-3 rounded bg-light">
                        <Brain className="text-success flex-shrink-0" size={32} />
                        <div>
                        <h6 className="fw-bold mb-0 text-dark">Apprentissage</h6>
                        <small className="text-muted">Enrichissez vos compétences</small>
                        </div>
                    </div>
                    </Col>
                    <Col sm={6}>
                    <div className="d-flex align-items-center gap-3 p-3 rounded bg-light">
                        <Heart className="text-success flex-shrink-0" size={32} />
                        <div>
                        <h6 className="fw-bold mb-0 text-dark">Développement</h6>
                        <small className="text-muted">Épanouissement personnel</small>
                        </div>
                    </div>
                    </Col>
                </Row>
                </div>
            </Col>

            <Col lg={6}>
                <div className="position-relative">
                <img 
                    src={images2} 
                    alt="Jeunes lisant ensemble"
                    className="img-fluid rounded-4 shadow-lg w-100 object-fit-cover"
                    style={{ maxHeight: '420px' }}
                />
                <div className="position-absolute bottom-0 start-0 bg-dark text-white p-3 rounded-3 m-3 opacity-90 shadow">
                    <p className="mb-0 small fw-semibold">
                    « La lecture est à l'esprit ce que l'exercice est au corps. »
                    </p>
                </div>
                </div>
            </Col>
            </Row>
        </Container>
        </section>

      {/* SECTION VALEURS */}
      <Container className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Pourquoi choisir BiblioTech ?</h2>
          <p className="text-muted">Une plateforme conçue pour faciliter l'accès à la culture et la gestion de vos lectures.</p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-3 mb-3">
                  <BookOpen size={32} />
                </div>
                <Card.Title className="fw-bold">Catalogue Riche & Varié</Card.Title>
                <Card.Text className="text-muted">
                  Des romans classiques aux ouvrages techniques, retrouvez une sélection de livres classés par catégories précises.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-3 mb-3">
                  <Clock size={32} />
                </div>
                <Card.Title className="fw-bold">Disponible 24h/24 et 7j/7</Card.Title>
                <Card.Text className="text-muted">
                  Consultez la disponibilité des exemplaires en temps réel et réservez vos lectures à tout moment depuis vos appareils.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-3 mb-3">
                  <ShieldCheck size={32} />
                </div>
                <Card.Title className="fw-bold">Gestion Simplifiée</Card.Title>
                <Card.Text className="text-muted">
                  Un espace membre personnalisé pour suivre l'état de vos réservations et vos dates de retour en un seul coup d'œil.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CATALOGUE */}
      <Container id="catalogue" className="py-4">
        <div className="border-top pt-4 mb-4">
          <h3 className="fw-bold mb-1 text-dark">Explorez les Livres</h3>
          <p className="text-muted mb-0">Recherchez ou filtrez par catégorie pour trouver votre prochaine lecture.</p>
        </div>

        <Row className="mb-4 g-3">
          <Col md={8}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Rechercher par titre ou auteur..."
                className="border-start-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              {Array.isArray(categories) && categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {loading ? (
          <Container className="text-center my-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2 text-muted">Chargement du catalogue...</p>
          </Container>
        ) : (
          <>
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredBooks.map((book) => (
                <Col key={book.id}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Badge bg="secondary" className="d-flex align-items-center gap-1">
                          <Tag size={12} /> {book.category?.name || 'Général'}
                        </Badge>
                        <Badge bg={book.available_copies > 0 ? 'success' : 'danger'}>
                          {book.available_copies > 0 ? `${book.available_copies} dispo` : 'Épuisé'}
                        </Badge>
                      </div>
                      <Card.Title className="fw-bold fs-5 mb-1">{book.title}</Card.Title>
                      <Card.Subtitle className="mb-3 text-muted fs-6">Par {book.author}</Card.Subtitle>
                      <Card.Text className="text-truncate flex-grow-1">
                        {book.description || 'Aucune description disponible.'}
                      </Card.Text>
                      <Button 
                        as={Link} 
                        to={`/books/${book.id}`} 
                        variant="outline-success" 
                        className="w-100 mt-3 d-flex align-items-center justify-content-center gap-2 fw-medium">
                        <BookOpen size={16} /> Voir les détails
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {filteredBooks.length === 0 && (
              <div className="text-center my-5 py-4">
                <p className="fs-5 text-muted">Aucun livre ne correspond à votre recherche.</p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;