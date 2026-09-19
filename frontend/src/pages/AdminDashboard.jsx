import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { Plus, Edit2, Trash2, BookOpen, Users, BookmarkCheck, CheckCircle2, XCircle } from 'lucide-react';
import API from '../services/api';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category_id: '',
    description: '',
    available_copies: 1,
    total_copies: 1
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [booksRes, catRes, borRes] = await Promise.all([
        API.get('/books'),
        API.get('/categories'),
        API.get('/admin/borrowings')
      ]);

      setBooks(Array.isArray(booksRes.data) ? booksRes.data : (booksRes.data?.data || []));
      setCategories(Array.isArray(catRes.data) ? catRes.data : (catRes.data?.data || []));
      setBorrowings(Array.isArray(borRes.data) ? borRes.data : (borRes.data?.data || []));
    } catch (error) {
      console.error('Erreur données admin:', error);
      setMessage({ type: 'danger', text: 'Impossible de charger les données administrateur.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title || '',
        author: book.author || '',
        category_id: book.category_id || '',
        description: book.description || '',
        available_copies: book.available_copies ?? 1,
        total_copies: book.total_copies ?? 1
      });
    } else {
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        category_id: categories[0]?.id || '',
        description: '',
        available_copies: 1,
        total_copies: 1
      });
    }
    setShowModal(true);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await API.put(`/books/${editingBook.id}`, formData);
        setMessage({ type: 'success', text: 'Ouvrage mis à jour avec succès !' });
      } else {
        await API.post('/books', formData);
        setMessage({ type: 'success', text: 'Ouvrage ajouté avec succès !' });
      }
      setShowModal(false);
      fetchAdminData();
    } catch (error) {
      console.error(error);
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Erreur lors de l\'enregistrement.' });
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet ouvrage ?')) {
      try {
        await API.delete(`/books/${id}`);
        setMessage({ type: 'success', text: 'Ouvrage supprimé.' });
        fetchAdminData();
      } catch (error) {
        console.error(error);
        setMessage({ type: 'danger', text: 'Erreur lors de la suppression.' });
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Chargement de l'espace administration...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Espace Administration</h2>
          <p className="text-muted mb-0">Gestion du catalogue et des emprunts</p>
        </div>
        <Button variant="success" className="d-inline-flex align-items-center gap-2 fw-medium" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Ajouter un livre
        </Button>
      </div>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      {/* Cartes statistiques */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 text-success rounded-3 p-3">
                <BookOpen size={28} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Livres</h6>
                <h3 className="fw-bold mb-0">{books.length}</h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                <BookmarkCheck size={28} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Emprunts en cours</h6>
                <h3 className="fw-bold mb-0">{borrowings.filter(b => !b.returned_at).length}</h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-info bg-opacity-10 text-info rounded-3 p-3">
                <Users size={28} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Emprunts</h6>
                <h3 className="fw-bold mb-0">{borrowings.length}</h3>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Onglets de Gestion */}
      <Tabs defaultActiveKey="books" className="mb-4 border-bottom">
        <Tab eventKey="books" title="Gestion des Livres">
          <Card className="border-0 shadow-sm">
            <Table responsive hover className="align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Titre</th>
                  <th>Auteur</th>
                  <th>Catégorie</th>
                  <th>Disponibilité</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td className="ps-4 fw-semibold text-dark">{book.title}</td>
                    <td className="text-muted">{book.author}</td>
                    <td><Badge bg="secondary">{book.category?.name || 'Général'}</Badge></td>
                    <td>
                      <Badge bg={book.available_copies > 0 ? 'success' : 'danger'}>
                        {book.available_copies} / {book.total_copies}
                      </Badge>
                    </td>
                    <td className="text-end pe-4">
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleOpenModal(book)}>
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteBook(book.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Tab>

        <Tab eventKey="borrowings" title="Historique des Emprunts">
          <Card className="border-0 shadow-sm">
            <Table responsive hover className="align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Adhérent</th>
                  <th>Livre</th>
                  <th>Date d'emprunt</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {borrowings.map((b) => (
                  <tr key={b.id}>
                    <td className="ps-4 fw-medium">{b.user?.name || 'Utilisateur'}</td>
                    <td>{b.book?.title || 'Ouvrage'}</td>
                    <td>{b.borrowed_at ? new Date(b.borrowed_at).toLocaleDateString('fr-FR') : '-'}</td>
                    <td>
                      {b.returned_at ? (
                        <Badge bg="secondary">Rendu le {new Date(b.returned_at).toLocaleDateString('fr-FR')}</Badge>
                      ) : (
                        <Badge bg="success">En cours</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Tab>
      </Tabs>

      {/* Modal Ajouter / Modifier Un Livre */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSaveBook}>
          <Modal.Header closeButton>
            <Modal.Title>{editingBook ? 'Modifier le livre' : 'Ajouter un livre'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Titre</Form.Label>
              <Form.Control 
                type="text" 
                required 
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Auteur</Form.Label>
              <Form.Control 
                type="text" 
                required 
                value={formData.author} 
                onChange={(e) => setFormData({ ...formData, author: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Catégorie</Form.Label>
              <Form.Select 
                value={formData.category_id} 
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium">Exemplaires disponibles</Form.Label>
                  <Form.Control 
                    type="number" 
                    min="0" 
                    required 
                    value={formData.available_copies} 
                    onChange={(e) => setFormData({ ...formData, available_copies: parseInt(e.target.value) })} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium">Exemplaires totaux</Form.Label>
                  <Form.Control 
                    type="number" 
                    min="1" 
                    required 
                    value={formData.total_copies} 
                    onChange={(e) => setFormData({ ...formData, total_copies: parseInt(e.target.value) })} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>Annuler</Button>
            <Button variant="success" type="submit">Enregistrer</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;