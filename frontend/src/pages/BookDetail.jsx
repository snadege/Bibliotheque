import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { ArrowLeft, BookOpen, Tag, CheckCircle2, XCircle, Calendar, BookmarkCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await API.get(`/books/${id}`);
      setBook(response.data?.data || response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du livre:', error);
      setMessage({ type: 'danger', text: 'Impossible de charger les détails de cet ouvrage.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBorrowing(true);
    setMessage({ type: '', text: '' });

    try {
      await API.post(`/borrowings`, { book_id: id });
      setMessage({ type: 'success', text: 'Livre emprunté avec succès ! Consultez votre espace membre.' });
      fetchBookDetails();
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Erreur lors de la réservation du livre.'
      });
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Chargement des informations de l'ouvrage...</p>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Ouvrage introuvable.</Alert>
        <Link to="/" className="btn btn-outline-success d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} /> Retour au catalogue
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Bouton Retour */}
      <div className="mb-4">
        <Link to="/" className="text-decoration-none text-muted d-inline-flex align-items-center gap-1 fw-medium">
          <ArrowLeft size={18} /> Retour au catalogue
        </Link>
      </div>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })} className="mb-4">
          {message.text}
        </Alert>
      )}

      <Card className="shadow-sm border-0 overflow-hidden">
        <Card.Body className="p-4 p-md-5">
          <Row className="g-4 align-items-center">
            {/* Icône / Visuel du Livre */}
            <Col md={4} className="text-center">
              <div className="bg-success bg-opacity-10 text-success rounded-4 p-5 d-inline-flex align-items-center justify-content-center w-100" style={{ minHeight: '260px' }}>
                <BookOpen size={96} strokeWidth={1.5} />
              </div>
            </Col>

            {/* Informations détaillées */}
            <Col md={8}>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Badge bg="secondary" className="d-inline-flex align-items-center gap-1 px-3 py-2">
                  <Tag size={14} /> {book.category?.name || 'Général'}
                </Badge>
                <Badge bg={book.available_copies > 0 ? 'success' : 'danger'} className="d-inline-flex align-items-center gap-1 px-3 py-2">
                  {book.available_copies > 0 ? (
                    <><CheckCircle2 size={14} /> {book.available_copies} disponible(s)</>
                  ) : (
                    <><XCircle size={14} /> Épuisé</>
                  )}
                </Badge>
              </div>

              <h1 className="fw-bold text-dark mb-2">{book.title}</h1>
              <p className="fs-5 text-muted mb-4">Par <span className="fw-semibold text-dark">{book.author}</span></p>

              <h5 className="fw-bold text-dark mb-2">Résumé</h5>
              <p className="text-secondary leading-relaxed mb-4">
                {book.description || 'Aucun résumé ou description disponible pour cet ouvrage.'}
              </p>

              <div className="border-top pt-4 d-flex flex-wrap align-items-center gap-3">
                {user ? (
                  <Button
                    variant="success"
                    size="lg"
                    className="px-4 d-inline-flex align-items-center gap-2 fw-semibold"
                    disabled={book.available_copies <= 0 || borrowing}
                    onClick={handleBorrow}
                  >
                    {borrowing ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <BookmarkCheck size={20} /> Emprunter l'ouvrage
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <Button as={Link} to="/login" variant="success" size="lg" className="px-4">
                      Se connecter pour emprunter
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookDetail;