import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Badge, Button, Spinner } from 'react-bootstrap';
import { Search, BookOpen, Tag, CheckCircle2, XCircle } from 'lucide-react';
import API from '../services/api';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get('/categories');
      const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories', error);
      setCategories([]);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await API.get('/books', {
        params: {
          search: search,
          category_id: selectedCategory,
        },
      });
      const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setBooks(data);
    } catch (error) {
      console.error('Erreur lors du chargement des livres', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <Container className="py-5">
      {/* Titre de la page */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark display-6">Catalogue des Livres</h2>
        <p className="text-muted">Explorez notre collection et découvrez vos prochaines lectures.</p>
      </div>

      {/* Barre de recherche et Filtres aux couleurs du thème */}
      <Form onSubmit={handleSearchSubmit} className="mb-4">
        <Row className="g-3">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Rechercher par titre ou auteur..."
                className="border-start-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name || cat.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button type="submit" variant="success" className="w-100 fw-medium">
              Filtrer
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Affichage des Livres */}
      {loading ? (
        <Container className="text-center my-5 py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2 text-muted">Chargement des ouvrages...</p>
        </Container>
      ) : books.length === 0 ? (
        <div className="text-center my-5 py-5 bg-white rounded shadow-sm border">
          <p className="fs-5 text-muted mb-0">Aucun livre ne correspond à votre recherche.</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              <Card className="h-100 shadow-sm border-0 overflow-hidden">
                {/* Couverture ou visuel par défaut */}
                {book.cover_image ? (
                  <Card.Img
                    variant="top"
                    src={book.cover_image}
                    alt={book.title}
                    style={{ height: '260px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center" style={{ height: '260px' }}>
                    <BookOpen size={64} strokeWidth={1.5} />
                  </div>
                )}

                <Card.Body className="d-flex flex-column p-3">
                  {/* Catégorie & Dispo */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="secondary" className="d-inline-flex align-items-center gap-1">
                      <Tag size={12} /> {book.category?.name || book.category?.label || 'Général'}
                    </Badge>
                    <Badge bg={book.available_copies > 0 ? 'success' : 'danger'} className="d-inline-flex align-items-center gap-1">
                      {book.available_copies > 0 ? (
                        <><CheckCircle2 size={12} /> {book.available_copies} dispo</>
                      ) : (
                        <><XCircle size={12} /> Épuisé</>
                      )}
                    </Badge>
                  </div>

                  <Card.Title className="fw-bold fs-6 mb-1 text-dark line-clamp-2" style={{ minHeight: '2.5rem' }}>
                    {book.title}
                  </Card.Title>
                  
                  <Card.Subtitle className="mb-3 text-muted small">
                    Par <span className="fw-semibold text-secondary">{book.author}</span>
                  </Card.Subtitle>

                  {/* Bouton Voir détails en vert */}
                  <Button
                    as={Link}
                    to={`/books/${book.id}`}
                    variant="outline-success"
                    size="sm"
                    className="w-100 mt-auto fw-medium d-flex align-items-center justify-content-center gap-2"
                  >
                    <BookOpen size={16} /> Voir détails
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Catalog;