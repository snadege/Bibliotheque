import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { Tag, Plus, Edit2, Trash2, FolderPlus } from 'lucide-react';
import API from '../services/api';

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await API.get('/categories');
      const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      setMessage({ type: 'danger', text: 'Impossible de charger les catégories.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setLabel(category.label || '');
    } else {
      setEditingCategory(null);
      setLabel('');
    }
    setShowModal(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      const payload = { label };

      if (editingCategory) {
        await API.put(`/categories/${editingCategory.id}`, payload);
        setMessage({ type: 'success', text: 'Catégorie mise à jour avec succès !' });
      } else {
        await API.post('/categories', payload);
        setMessage({ type: 'success', text: 'Catégorie ajoutée avec succès !' });
      }
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Erreur lors de l\'enregistrement.'
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await API.delete(`/categories/${id}`);
        setMessage({ type: 'success', text: 'Catégorie supprimée.' });
        fetchCategories();
      } catch (error) {
        console.error(error);
        setMessage({
          type: 'danger',
          text: error.response?.data?.message || 'Erreur lors de la suppression.'
        });
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Chargement des catégories...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-success bg-opacity-10 text-success rounded-circle p-3">
            <Tag size={28} />
          </div>
          <div>
            <h2 className="fw-bold mb-0">Gestion des Catégories</h2>
            <p className="text-muted mb-0">Organisez les rayons et thématiques de la bibliothèque</p>
          </div>
        </div>
        <Button
          variant="success"
          className="d-inline-flex align-items-center gap-2 fw-medium"
          onClick={() => handleOpenModal()}
        >
          <Plus size={18} /> Nouvelle Catégorie
        </Button>
      </div>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      {categories.length === 0 ? (
        <Card className="text-center p-5 border-0 shadow-sm">
          <Card.Body>
            <FolderPlus size={48} className="text-muted mb-3" />
            <h5 className="fw-bold">Aucune catégorie trouvée</h5>
            <p className="text-muted">Créez votre première catégorie pour organiser les ouvrages.</p>
            <Button
              variant="success"
              className="mt-2 d-inline-flex align-items-center gap-2"
              onClick={() => handleOpenModal()}
            >
              <Plus size={16} /> Ajouter une catégorie
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm overflow-hidden">
          <Table responsive hover className="align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="py-3 ps-4">Nom de la catégorie</th>
                <th className="py-3">Slug (Identifiant URL)</th>
                <th className="py-3 text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="ps-4 fw-semibold text-dark">{cat.label}</td>
                  <td><code>{cat.slug}</code></td>
                  <td className="text-end pe-4">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenModal(cat)}
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Modal Créer / Modifier une Catégorie */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSaveCategory}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Nom de la catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Science-Fiction, Informatique..."
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button variant="success" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default CategoriesManager;