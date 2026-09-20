import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { Plus, Edit2, Trash2, BookOpen, Users, BookmarkCheck, RefreshCw, TrendingUp, UserCheck } from 'lucide-react';
import API from '../services/api';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [stats, setStats] = useState({
    total_books: 0,
    active_borrowings: 0,
    total_borrowings: 0,
    total_users: 0,
    popular_books: [],
    latest_users: []
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category_id: '',
    description: '',
    cover_image: ''
  });

  useEffect(() => {
    fetchAdminData(true);

    // Rafraîchissement automatique en arrière-plan toutes les 8 secondes
    const interval = setInterval(() => {
      fetchAdminData(false);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const fetchAdminData = async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const [statsRes, booksRes, catRes, borRes] = await Promise.allSettled([
        API.get('/admin/stats'),
        API.get('/books'),
        API.get('/categories'),
        API.get('/borrowings')
      ]);

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data?.data || statsRes.value.data);
      }

      if (booksRes.status === 'fulfilled') {
        setBooks(booksRes.value.data?.data || booksRes.value.data || []);
      }

      if (catRes.status === 'fulfilled') {
        const catData = catRes.value.data?.data || catRes.value.data || [];
        setCategories(catData);
      }

      if (borRes.status === 'fulfilled') {
        setBorrowings(borRes.value.data?.data || borRes.value.data || []);
      }
    } catch (error) {
      console.error('Erreur chargement admin:', error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleOpenModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        category_id: book.category_id || '',
        description: book.description || '',
        cover_image: book.cover_image || ''
      });
    } else {
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        isbn: `978-${Math.floor(100000000 + Math.random() * 900000000)}`,
        category_id: categories[0]?.id || '',
        description: '',
        cover_image: ''
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
      fetchAdminData(false);
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Erreur lors de l’enregistrement.' });
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet ouvrage ?')) {
      try {
        await API.delete(`/books/${id}`);
        setMessage({ type: 'success', text: 'Ouvrage supprimé.' });
        fetchAdminData(false);
      } catch (error) {
        setMessage({ type: 'danger', text: 'Erreur lors de la suppression.' });
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Chargement du tableau de bord...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Espace Administration</h2>
          <p className="text-muted mb-0">Vue d'ensemble et gestion en temps réel</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" size="sm" onClick={() => fetchAdminData(true)}>
            <RefreshCw size={16} /> Actualiser
          </Button>
          <Button variant="success" className="d-inline-flex align-items-center gap-2 fw-medium" onClick={() => handleOpenModal()}>
            <Plus size={18} /> Ajouter un livre
          </Button>
        </div>
      </div>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      {/* Cartes statistiques en temps réel */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 text-success rounded-3 p-3">
                <BookOpen size={26} />
              </div>
              <div>
                <h6 className="text-muted mb-1 small fw-semibold">Total Livres</h6>
                <h3 className="fw-bold mb-0">{stats.total_books || books.length}</h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                <BookmarkCheck size={26} />
              </div>
              <div>
                <h6 className="text-muted mb-1 small fw-semibold">Emprunts en cours</h6>
                <h3 className="fw-bold mb-0">{stats.active_borrowings}</h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-info bg-opacity-10 text-info rounded-3 p-3">
                <TrendingUp size={26} />
              </div>
              <div>
                <h6 className="text-muted mb-1 small fw-semibold">Total Emprunts</h6>
                <h3 className="fw-bold mb-0">{stats.total_borrowings || borrowings.length}</h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3">
                <Users size={26} />
              </div>
              <div>
                <h6 className="text-muted mb-1 small fw-semibold">Membres inscrits</h6>
                <h3 className="fw-bold mb-0">{stats.total_users}</h3>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Section Tendances & Flux d'utilisateurs */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 p-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <TrendingUp size={20} className="text-success" />
              <h6 className="fw-bold mb-0">Livres les plus populaires</h6>
            </div>
            {stats.popular_books?.length === 0 ? (
              <p className="text-muted small my-auto text-center">Aucune donnée de tendance.</p>
            ) : (
              <Table borderless size="sm" hover className="align-middle mb-0">
                <thead>
                  <tr className="text-muted small border-bottom">
                    <th>Titre</th>
                    <th>Auteur</th>
                    <th className="text-end">Ajouts/Emprunts</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.popular_books?.map((b) => (
                    <tr key={b.id}>
                      <td className="fw-semibold text-dark">{b.title}</td>
                      <td className="text-muted small">{b.author}</td>
                      <td className="text-end"><Badge bg="success">{b.reading_lists_count || 0}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 p-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <UserCheck size={20} className="text-primary" />
              <h6 className="fw-bold mb-0">Derniers membres inscrits</h6>
            </div>
            {stats.latest_users?.length === 0 ? (
              <p className="text-muted small my-auto text-center">Aucun inscrit récent.</p>
            ) : (
              <Table borderless size="sm" hover className="align-middle mb-0">
                <thead>
                  <tr className="text-muted small border-bottom">
                    <th>Nom</th>
                    <th>Email</th>
                    <th className="text-end">Inscrit le</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.latest_users?.map((u) => (
                    <tr key={u.id}>
                      <td className="fw-medium text-dark">{u.name}</td>
                      <td className="text-muted small">{u.email}</td>
                      <td className="text-end small text-muted">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
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
                  <th>ISBN</th>
                  <th>Catégorie</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td className="ps-4 fw-semibold text-dark">{book.title}</td>
                    <td className="text-muted">{book.author}</td>
                    <td><code>{book.isbn || 'N/A'}</code></td>
                    <td>
                      <Badge bg="secondary">
                        {book.category?.label || book.category?.name || 'Général'}
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
                  <th>Date d'ajout</th>
                </tr>
              </thead>
              <tbody>
                {borrowings.map((b) => (
                  <tr key={b.id || Math.random()}>
                    <td className="ps-4 fw-medium">{b.user?.name || 'Membre'}</td>
                    <td>{b.book?.title || b.title || 'Ouvrage'}</td>
                    <td>{b.created_at ? new Date(b.created_at).toLocaleDateString('fr-FR') : '-'}</td>
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
            <Modal.Title className="fw-bold">{editingBook ? 'Modifier le livre' : 'Ajouter un livre'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Titre</Form.Label>
              <Form.Control type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Auteur</Form.Label>
              <Form.Control type="text" required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Code ISBN</Form.Label>
              <Form.Control type="text" required value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Catégorie</Form.Label>
              <Form.Select required value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                <option value="">-- Sélectionner une catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label || cat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">URL Image Couverture</Form.Label>
              <Form.Control type="text" placeholder="https://..." value={formData.cover_image} onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Description</Form.Label>
              <Form.Control as="textarea" rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
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